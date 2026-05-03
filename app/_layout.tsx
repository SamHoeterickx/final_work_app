import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useTranslation } from 'react-i18next';
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

// TRANSLATIONS
import '@/i18n';

// CONTEXT AND STORE
import { useAuthStore } from '@/shared/context/authStore.context';
import { useUserPreferencesStore } from '@/shared/context/userPreferencesStore.context';

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
            router.replace('/(auth)/postOnboardingFlow');
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
    const { language } = useUserPreferencesStore();
    const { i18n } = useTranslation();

    useEffect(() => {
        if (language && i18n.language !== language) {
            i18n.changeLanguage(language);
        }
    }, [language, i18n]);

    return (
        <QueryClientProvider client={queryClient}>
            <InitialLayout />
        </QueryClientProvider>
    );
}
