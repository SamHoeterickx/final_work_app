import * as SecureStore from 'expo-secure-store';
import { Stack } from 'expo-router';
import { useEffect } from 'react';

// CONTEXT AND STORE
import { useAuthStore } from '@/shared/context/authStore.context';

export default function RootLayout() {
	useEffect(() => {
		const updateTokenStates = async () => {
			const secureAccessToken = await SecureStore.getItemAsync('accessToken');
			const secureRefreshToken = await SecureStore.getItemAsync('refreshToken');

			if (secureAccessToken && secureRefreshToken) {
				useAuthStore
					.getState()
					.setTokens(secureAccessToken, secureRefreshToken);
			} else {
				// router.replace('/login');
			}
		};

		updateTokenStates();
	}, []);

	return <Stack screenOptions={{ headerShown: false }} />;
}
