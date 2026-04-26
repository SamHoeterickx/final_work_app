import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';

// CONTEXT AND STORE
import { useAuthStore } from '@/shared/context/authStore.context';

const queryClient = new QueryClient();

const InitialLayout = () => {
    const { accessToken, isHydrated, setHydrated, setTokens } = useAuthStore();

    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const loadTokens = async () => {
            try{
                const secureAccessToken = await SecureStore.getItemAsync('accessToken');
				const secureRefreshToken = await SecureStore.getItemAsync('refreshToken');

				if (secureAccessToken && secureRefreshToken) {
					setTokens(secureAccessToken, secureRefreshToken);
				}
			} catch (error) {
				console.error("Failed to load tokens", error);
			} finally {
				setHydrated(true); 
			}
        }
        loadTokens();
    }, [])

    useEffect(() => {
        if(!isHydrated) return;

        const inAuthGroup = segments[0] === '(auth)';

        if (!accessToken && !inAuthGroup) {
			router.replace('/(auth)/login');
		} else if (accessToken && inAuthGroup) {
			router.replace('/(app)/home');
		}
	}, [accessToken, isHydrated, segments]);

    if (!isHydrated) {
		return null;
	}

    return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
	return (
        <QueryClientProvider client={queryClient}>
            <InitialLayout />
        </QueryClientProvider>
    )
}
