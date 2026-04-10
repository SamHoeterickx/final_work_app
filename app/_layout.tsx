import { useAuthStore } from '@/shared/context/authStore.context';
import { Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';

export default function RootLayout() {
	useEffect(() => {
		const updateTokenStates = async () => {
			const secureAccessToken = await SecureStore.getItemAsync('accessToken');
      console.log('secureAccessToken from SecureStore:', secureAccessToken);
			const secureRefreshToken = await SecureStore.getItemAsync('refreshToken');
      console.log('secureRefreshToken from SecureStore:', secureRefreshToken);

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
