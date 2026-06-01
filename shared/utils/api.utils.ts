import * as SecureStore from 'expo-secure-store';

// CONTEXT AND STORE
import { useAuthStore } from '@/shared/context/authStore.context';

// TYPES
import { TGraphQLError, TTokenRefreshSubscriber } from '@/shared/types/types';
import { IRefreshTokensResponse, TGraphQLResponse } from '../types/response.type';

// const GRAPHQL_ENDPOINT = 'http://localhost:8080/graphql';
const GRAPHQL_ENDPOINT = 'http://100.110.165.25:8080/graphql';

let isRefreshing = false;
let refreshSubscribers: TTokenRefreshSubscriber[] = [];

const addTokenRefreshSubscriber = (subscriber: TTokenRefreshSubscriber): void => {
    refreshSubscribers.push(subscriber);
};

const onRefreshed = (token: string | null): void => {
    refreshSubscribers.forEach((subscriber) => subscriber(token));
    refreshSubscribers = [];
};

/**
 * Decodes the JWT token and checks if it's expired locally.
 * Returns true (treat as expired) when the token is malformed or unreadable,
 * so a broken token never silently passes through as valid.
 */
export const isTokenExpired = (token: string): boolean => {
    try {
        const payloadBase64 = token.split('.')[1];
        if (!payloadBase64) return true;

        const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
        const jsonString = atob(base64);
        const payload = JSON.parse(jsonString);

        if (payload && payload.exp) {
            const currentTime = Math.floor(Date.now() / 1000);
            return payload.exp < currentTime + 5;
        }
    } catch (error) {
        console.error(error);
        return true;
    }
    return false;
};

/**
 * Fetch GraphQL Query or Mutation with authentication.
 * Gets the AccessToken and RefreshToken from authStore.
 * Handles transparent token refresh with a subscriber queue so that
 * concurrent requests during a refresh all retry once the new token arrives.
 *
 * @param query     - GraphQL query/mutation string
 * @param variables - optional variables object
 *
 * @returns the `data` field of the GraphQL response, typed as T
 * @throws  if the session cannot be refreshed or the request fails
 */
export const graphqlFetch = async <T = unknown>(
    query: string,
    variables: Record<string, unknown> = {},
): Promise<T | undefined> => {
    const performRequest = async (
        token: string,
    ): Promise<{ response: Response; data: TGraphQLResponse<T> }> => {
        const headers = new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
        });

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        const response = await fetch(GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers,
            body: JSON.stringify({ query, variables }),
        });

        const data: TGraphQLResponse<T> = await response.json();

        return { response, data };
    };

    const currentToken = useAuthStore.getState().accessToken;
    if (!currentToken) {
        throw new Error('Unauthorized: failed to find token');
    }

    const { response, data } = await performRequest(currentToken);
    const isUnauthorized =
        response.status === 401 ||
        (data.errors &&
            data.errors.some(
                (error: TGraphQLError) => error.extensions?.code === 'UNAUTHENTICATED',
            ));

    if (isUnauthorized) {
        if (!isRefreshing) {
            isRefreshing = true;

            try {
                const currentRefreshToken = useAuthStore.getState().refreshToken;
                if (!currentRefreshToken) throw new Error('No refresh token available');

                const refreshQuery = `
                    mutation RefreshTokens($refreshToken: String!) {
                        refreshTokens(input: { refreshToken: $refreshToken }) {
                            accessToken
                            refreshToken
                        }
                    }
                `;

                const refreshRes = await fetch(GRAPHQL_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify({
                        query: refreshQuery,
                        variables: { refreshToken: currentRefreshToken },
                    }),
                });

                if (!refreshRes.ok) throw new Error('Token refresh request failed');

                const refreshData: TGraphQLResponse<{ refreshTokens: IRefreshTokensResponse }> =
                    await refreshRes.json();

                if (refreshData.errors && refreshData.errors.length > 0) {
                    throw new Error(refreshData.errors[0].message);
                }

                const newAccessToken = refreshData.data?.refreshTokens?.accessToken;
                const newRefreshToken = refreshData.data?.refreshTokens?.refreshToken;
                if (!newAccessToken || !newRefreshToken) {
                    throw new Error('Token refresh succeeded but no tokens were returned');
                }

                await SecureStore.setItemAsync('accessToken', newAccessToken);
                await SecureStore.setItemAsync('refreshToken', newRefreshToken);
                useAuthStore.getState().setTokens(newAccessToken, newRefreshToken, false);

                onRefreshed(newAccessToken);
                isRefreshing = false;

                const retryResult = await performRequest(newAccessToken);

                if (retryResult.data.errors && retryResult.data.errors.length > 0) {
                    throw new Error(retryResult.data.errors[0].message);
                }

                return retryResult.data.data;
            } catch (error) {
                isRefreshing = false;
                useAuthStore.getState().logout();
                onRefreshed(null);
                throw new Error(error instanceof Error ? error.message : String(error));
            }
        }

        return new Promise<T | undefined>((resolve, reject) => {
            addTokenRefreshSubscriber(async (newToken) => {
                if (!newToken) {
                    reject(new Error('Session expired'));
                    return;
                }
                try {
                    const retryResult = await performRequest(newToken);
                    if (retryResult.data.errors && retryResult.data.errors.length > 0) {
                        reject(new Error(retryResult.data.errors[0].message));
                    } else {
                        resolve(retryResult.data.data);
                    }
                } catch (err) {
                    reject(err instanceof Error ? err : new Error(String(err)));
                }
            });
        });
    }

    if (data.errors && data.errors.length > 0) {
        throw new Error(data.errors[0].message);
    }

    return data.data;
};

/**
 * Fetch GraphQL authentication Query or Mutation (no token refresh logic).
 * Used for auth flows (login, register, password reset) where the caller
 * needs access to the raw response and errors.
 *
 * @param query     - GraphQL query/mutation string
 * @param variables - optional variables object
 *
 * @returns `{ response, data }` or undefined
 * @throws  if the network request itself fails
 */
export const graphFetchAuth = async (
    query: string,
    variables: Record<string, unknown> = {},
): Promise<{ response: Response; data: TGraphQLResponse } | undefined> => {
    try {
        const token = useAuthStore.getState().accessToken;

        const headers = new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
        });

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        const response = await fetch(GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers,
            body: JSON.stringify({ query, variables }),
        });

        const data: TGraphQLResponse = await response.json();

        return { response, data };
    } catch (error) {
        throw new Error(
            `GraphQL request failed: ${error instanceof Error ? error.message : String(error)}`,
        );
    }
};
