import * as SecureStore from 'expo-secure-store';

// UTILS
import { graphFetchAuth } from '../utils/api.utils';

// TYPES
import { ILoginCredentials, ILoginUserResponse, TGraphQLResponse } from '../types/types';

// MUTATIONS
import { LOGIN_USER } from '../graphql/mutations';
import { useAuthStore } from '../context/authStore.context';

class AuthService {
	constructor() {}

	async login(credentials: ILoginCredentials) {
		try {
            const result = await graphFetchAuth(LOGIN_USER, credentials as unknown as Record<string, any>);

            if (!result || !result.data) {
                throw new Error('Login failed: No data returned');
            }

            const data = result.data as TGraphQLResponse<ILoginUserResponse>;
            
            if (data.errors) {
                throw new Error(data.errors[0].extensions?.code || 'Login failed');
            }

            const newAccessToken = data.data?.loginUser?.accessToken;
            const newRefreshToken = data.data?.loginUser?.refreshToken;

            if (!newAccessToken || !newRefreshToken)
			throw new Error('Failed to recieve new token');

            await SecureStore.setItemAsync('accessToken', newAccessToken);
            await SecureStore.setItemAsync('refreshToken', newRefreshToken);
            useAuthStore.getState().setTokens(newAccessToken, newRefreshToken);
		} catch (error) {
            throw error;
        }
	}
}

export const authService = new AuthService();
