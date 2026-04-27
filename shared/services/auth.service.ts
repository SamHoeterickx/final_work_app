import * as SecureStore from 'expo-secure-store';

// UTILS
import { graphFetchAuth } from '../utils/api.utils';

// TYPES
import { ILoginCredentials } from '../types/types';

// MUTATIONS
import { useAuthStore } from '../context/authStore.context';
import { LOGIN_USER } from '../graphql/mutations';

class AuthService {
	constructor() {}

	async login(credentials: ILoginCredentials) {
    try {
        const result = await graphFetchAuth(LOGIN_USER, credentials as unknown as Record<string, any>);

        if (!result || !result.data) {
            throw new Error('Geen data ontvangen van de server');
        }

        const data = result.data as any;         
        if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
            const errorItem = data.errors[0];

            const validationMessage = errorItem.extensions?.originalError?.message;
            
            if (validationMessage) {
                if (Array.isArray(validationMessage)) {
                    throw new Error(validationMessage.join('\n')); 
                }
                if (typeof validationMessage === 'string') {
                    throw new Error(validationMessage);
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
        useAuthStore.getState().setTokens(newAccessToken, newRefreshToken);
        
    } catch (error) {
        throw error;
    }
}
}

export const authService = new AuthService();
