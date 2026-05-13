import * as SecureStore from 'expo-secure-store';

// UTILS
import { graphFetchAuth, graphqlFetch } from '@/shared/utils/api.utils';

// TYPES
import {
    IChangePasswordWithResetCodeCredentials,
    IDeleteUserCredentials,
    ILoginCredentials,
    IOnboardingAnswers,
    IRegisterCredentials,
    IRequestResetCodeCredentials,
    IUpdateEmailCredentials,
    IUpdateUsernameCredentials,
    IVerifyResetCodeCredentials,
} from '@/shared/types/types';

// CONTEXT
import { useAuthStore } from '@/shared/context/authStore.context';

// MUTATIONS
import {
    DELETE_USER_MUTATION,
    LOGIN_USER_MUTATION,
    LOGOUT_MUTATION,
    REGISTER_USER_MUTATION,
    REQUEST_RESET_CODE_MUTATION,
    RESET_PASSWORD_WITH_RESET_CODE_MUTATION,
    UPDATE_EMAIL_MUTATION,
    UPDATE_USERNAME_MUTATION,
    VERIFY_RESET_CODE_MUTATION,
} from '@/shared/graphql/mutations';
import { GET_USER_DATA_QUERY } from '../graphql/query';

class AuthService {
    constructor() {}

    async login(credentials: ILoginCredentials) {
        try {
            const result = await graphFetchAuth(
                LOGIN_USER_MUTATION,
                credentials as unknown as Record<string, any>,
            );

            if (!result || !result.data) {
                throw new Error('Failed to recieve data');
            }

            const data = result.data as any;
            if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
                const errorItem = data.errors[0];

                const validationMessage = errorItem.extensions?.originalError?.message;

                if (validationMessage) {
                    if (Array.isArray(validationMessage)) {
                        throw new Error(validationMessage[0]);
                    }
                    if (typeof validationMessage === 'string') {
                        throw new Error(validationMessage[0]);
                    }
                }
                const topLevelMessage = errorItem.message;
                if (topLevelMessage && topLevelMessage !== 'Bad Request Exception') {
                    throw new Error(topLevelMessage);
                }

                throw new Error('Unknown error occured while login');
            }

            const newAccessToken = data.data?.loginUser?.accessToken;
            const newRefreshToken = data.data?.loginUser?.refreshToken;

            if (!newAccessToken || !newRefreshToken) {
                throw new Error('Login Successfull, but no tokens recieved');
            }

            await SecureStore.setItemAsync('accessToken', newAccessToken);
            await SecureStore.setItemAsync('refreshToken', newRefreshToken);
            useAuthStore.getState().setTokens(newAccessToken, newRefreshToken, false);
        } catch (error) {
            throw error;
        }
    }

    async register(credentials: IRegisterCredentials, onboarding: IOnboardingAnswers) {
        try {
            const variables = { ...credentials, onboarding };
            const result = await graphFetchAuth(REGISTER_USER_MUTATION, variables);

            if (!result || !result.data) {
                throw new Error('Failed to recieve data');
            }

            const data = result.data as any;
            if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
                const errorItem = data.errors[0];

                const validationMessage = errorItem.extensions?.originalError?.message;

                if (validationMessage) {
                    if (Array.isArray(validationMessage)) {
                        throw new Error(validationMessage[0]);
                    }
                    if (typeof validationMessage === 'string') {
                        throw new Error(validationMessage[0]);
                    }
                }
                const topLevelMessage = errorItem.message;
                if (topLevelMessage && topLevelMessage !== 'Bad Request Exception') {
                    throw new Error(topLevelMessage);
                }

                throw new Error('Unknown error occured while register');
            }

            const newAccessToken = data.data?.registerUser?.accessToken;
            const newRefreshToken = data.data?.registerUser?.refreshToken;

            if (!newAccessToken || !newRefreshToken) {
                throw new Error('Register Successfull, but no tokens recieved');
            }

            await SecureStore.setItemAsync('accessToken', newAccessToken);
            await SecureStore.setItemAsync('refreshToken', newRefreshToken);
            useAuthStore.getState().setTokens(newAccessToken, newRefreshToken, true);
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            const response = await graphFetchAuth(LOGOUT_MUTATION);

            if (!response) return;

            await SecureStore.deleteItemAsync('accessToken');
            await SecureStore.deleteItemAsync('refreshToken');
            useAuthStore.getState().logout();
        } catch (error) {
            throw error;
        }
    }

    async requestResetCode(credentials: IRequestResetCodeCredentials) {
        try {
            const result = await graphFetchAuth(
                REQUEST_RESET_CODE_MUTATION,
                credentials as unknown as Record<string, any>,
            );

            if (!result || !result.data) {
                throw new Error('Failed to recieve data');
            }

            const data = result.data as any;
            if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
                const errorItem = data.errors[0];

                const validationMessage = errorItem.extensions?.originalError?.message;

                if (validationMessage) {
                    if (Array.isArray(validationMessage)) {
                        throw new Error(validationMessage[0]);
                    }
                    if (typeof validationMessage === 'string') {
                        throw new Error(validationMessage[0]);
                    }
                }
                const topLevelMessage = errorItem.message;
                if (topLevelMessage && topLevelMessage !== 'Bad Request Exception') {
                    throw new Error(topLevelMessage);
                }

                throw new Error('Unknown error occured while requesting password reset');
            }
        } catch (error) {
            throw error;
        }
    }

    async verifyResetCode(credentials: IVerifyResetCodeCredentials) {
        try {
            const result = await graphFetchAuth(
                VERIFY_RESET_CODE_MUTATION,
                credentials as unknown as Record<string, any>,
            );

            if (!result || !result.data) {
                throw new Error('Failed to recieve data');
            }

            const data = result.data as any;
            if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
                const errorItem = data.errors[0];

                const validationMessage = errorItem.extensions?.originalError?.message;

                if (validationMessage) {
                    if (Array.isArray(validationMessage)) {
                        throw new Error(validationMessage[0]);
                    }
                    if (typeof validationMessage === 'string') {
                        throw new Error(validationMessage[0]);
                    }
                }
                const topLevelMessage = errorItem.message;
                if (topLevelMessage && topLevelMessage !== 'Bad Request Exception') {
                    throw new Error(topLevelMessage);
                }

                throw new Error('Unknown error occured while verifying reset code');
            }
        } catch (error) {
            throw error;
        }
    }

    async changePasswordWithResetCode(credentials: IChangePasswordWithResetCodeCredentials) {
        try {
            const result = await graphFetchAuth(
                RESET_PASSWORD_WITH_RESET_CODE_MUTATION,
                credentials as unknown as Record<string, any>,
            );

            if (!result || !result.data) {
                throw new Error('Failed to recieve data');
            }

            const data = result.data as any;
            if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
                const errorItem = data.errors[0];

                const validationMessage = errorItem.extensions?.originalError?.message;

                if (validationMessage) {
                    if (Array.isArray(validationMessage)) {
                        throw new Error(validationMessage[0]);
                    }
                    if (typeof validationMessage === 'string') {
                        throw new Error(validationMessage[0]);
                    }
                }
                const topLevelMessage = errorItem.message;
                if (topLevelMessage && topLevelMessage !== 'Bad Request Exception') {
                    throw new Error(topLevelMessage);
                }

                throw new Error('Unknown error occured while requesting password reset');
            }

            const newAccessToken = data.data?.resetPasswordWithCode?.accessToken;
            const newRefreshToken = data.data?.resetPasswordWithCode?.refreshToken;

            if (!newAccessToken || !newRefreshToken) {
                throw new Error('Register Successfull, but no tokens recieved');
            }

            await SecureStore.setItemAsync('accessToken', newAccessToken);
            await SecureStore.setItemAsync('refreshToken', newRefreshToken);
            useAuthStore.getState().setTokens(newAccessToken, newRefreshToken, false);
        } catch (error) {
            throw error;
        }
    }

    async getUserData() {
        try {
            return await graphFetchAuth(GET_USER_DATA_QUERY);
        } catch (error) {
            throw error;
        }
    }

    async updateUsername(credentials: IUpdateUsernameCredentials) {
        try {
            console.log(credentials);
            return await graphqlFetch<any>(UPDATE_USERNAME_MUTATION, {
                updatedUsername: credentials.updatedUsername,
            });
        } catch (error) {
            throw error;
        }
    }

    async updateEmail(credentials: IUpdateEmailCredentials) {
        try {
            return await graphqlFetch<any>(UPDATE_EMAIL_MUTATION, {
                updatedEmailAdress: credentials.updatedEmailAdress,
            });
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(credentials: IDeleteUserCredentials) {
        try {
            return await graphqlFetch<any>(DELETE_USER_MUTATION, {
                password: credentials.password,
            });
        } catch (error) {
            throw error;
        }
    }
}

export const authService = new AuthService();
