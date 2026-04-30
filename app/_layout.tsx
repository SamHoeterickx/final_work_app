import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
// FONTS
import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
    useFonts,
} from '@expo-google-fonts/inter';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

// TRANSLATIONS
import '../i18n';

// CONTEXT AND STORE
import { useAuthStore } from '@/shared/context/authStore.context';

const queryClient = new QueryClient();

const InitialLayout = () => {
    const { accessToken, isHydrated, needsRoadmap, setHydrated, setTokens } = useAuthStore();

    const segments = useSegments();
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
        Inter_900Black,
    });

    useEffect(() => {
        const loadTokens = async () => {
            try {
                SecureStore.deleteItemAsync('accessToken');
                SecureStore.deleteItemAsync('refreshTOken');
                const secureAccessToken = await SecureStore.getItemAsync('accessToken');
                const secureRefreshToken = await SecureStore.getItemAsync('refreshToken');

                if (secureAccessToken && secureRefreshToken) {
                    setTokens(secureAccessToken, secureRefreshToken, false);
                }
            } catch (error) {
                console.error('Failed to load tokens', error);
            } finally {
                setHydrated(true);
            }
        };
        loadTokens();
    }, []);

    useEffect(() => {
        if (!isHydrated) return;

        const inAuthGroup = segments[0] === '(auth)';

        if (!accessToken && !inAuthGroup) {
            router.replace('/(auth)/startApp');
        } else if (accessToken && needsRoadmap) {
            router.replace('/(auth)/generateRoadmap');
        } else if (accessToken && inAuthGroup && !needsRoadmap) {
            router.replace('/(app)/home');
        }
    }, [accessToken, isHydrated, segments, needsRoadmap]);

    if (!isHydrated && !fontsLoaded) {
        return null;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
};

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <InitialLayout />
        </QueryClientProvider>
    );
}
