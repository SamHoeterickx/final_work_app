import { useAuthStore } from '../context/authStore.context';
import { IRefreshTokensResponse, TGraphQLError, TGraphQLResponse, TTokenRefreshSubscriber } from '../types/types';


const GRAPHQL_ENDPOINT = 'http://localhost:8080/graphql';

let isRefreshing = false;
let refreshSubscribers: TTokenRefreshSubscriber[] = [];

const addTokenRefreshSubscriber = (subscriber: TTokenRefreshSubscriber): void => {
	refreshSubscribers.push(subscriber);
};

const onRefreshed = (token: string | null): void => {
	refreshSubscribers.forEach((subscriber) => subscriber(token));
	refreshSubscribers = [];
};

export const graphqlFetch = async <T = unknown>(query: string, variables: Record<string, unknown> = {}): Promise<T | undefined> => {
	const performRequest = async (token: string,): Promise<{ response: Response; data: TGraphQLResponse<T> }> => {
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
		return undefined;
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
				if (!currentRefreshToken) throw new Error('No refreshtoken available');

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

				if (!refreshRes.ok) throw new Error('Refresh failed');

				const refreshData: TGraphQLResponse<IRefreshTokensResponse> =
					await refreshRes.json();

				const newAccessToken = refreshData.data?.refreshTokens?.accessToken;
				const newRefreshToken = refreshData.data?.refreshTokens?.refreshToken;
				if (!newAccessToken || !newRefreshToken) throw new Error('Failed to recieve new token');

				useAuthStore.getState().setTokens(newAccessToken, newRefreshToken);
				isRefreshing = false;
				onRefreshed(newAccessToken);

				const retryResult = await performRequest(newAccessToken);
				return retryResult.data.data;
			} catch (error) {
				isRefreshing = false;
				useAuthStore.getState().logout();
				onRefreshed(null);
				throw new Error('Sessie verlopen');
			}
		} else {
			return new Promise<T | undefined>((resolve, reject) => {
				addTokenRefreshSubscriber(async (newToken) => {
					if (newToken) {
						const retryResult = await performRequest(newToken);
						resolve(retryResult.data.data);
					} else {
						reject(new Error('Sessie verlopen'));
					}
				});
			});
		}
	}
	return data.data;
};

export const graphFetchAuth = async (query: string, variables: Record<string, unknown> = {}): Promise<{ response: Response; data: TGraphQLResponse } | undefined> => {
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
		throw new Error(`GraphQL request failed: ${error instanceof Error ? error.message : String(error)}`);
	}
}
