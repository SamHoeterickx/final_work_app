import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// FONTS
import { useFonts } from 'expo-font';

// TRANSLATIONS
import '@/i18n';

// CONTEXT AND STORE
import { useAuthStore } from '@/shared/context/authStore.context';
import { useUserDataStore } from '@/shared/context/userDataStore.context';

// STYLES
import { colors } from '@/shared/styles/design.system';

const queryClient = new QueryClient();

const InitialLayout = () => {
    const { accessToken, isHydrated, needsRoadmap, setHydrated, setTokens } = useAuthStore();

    const segments = useSegments();
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        'Vanguard-Thin': require('../assets/fonts/vanguard/VanguardCF-Thin.otf'),
        'Vanguard-Light': require('../assets/fonts/vanguard/VanguardCF-Light.otf'),
        'Vanguard-Regular': require('../assets/fonts/vanguard/VanguardCF-Regular.otf'),
        'Vanguard-Medium': require('../assets/fonts/vanguard/VanguardCF-Medium.otf'),
        'Vanguard-DemiBold': require('../assets/fonts/vanguard/VanguardCF-DemiBold.otf'),
        'Vanguard-Bold': require('../assets/fonts/vanguard/VanguardCF-Bold.otf'),
        'Vanguard-ExtraBold': require('../assets/fonts/vanguard/VanguardCF-ExtraBold.otf'),
        'Vanguard-Heavy': require('../assets/fonts/vanguard/VanguardCF-Heavy.otf'),
    });

    useEffect(() => {
        const loadTokens = async () => {
            try {
                // SecureStore.deleteItemAsync('accessToken');
                // SecureStore.deleteItemAsync('refreshToken');
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

    if (!isHydrated || !fontsLoaded) {
        return null;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.background },
            }}
        />
    );
};

export default function RootLayout() {
    const { language, fetchUserLanguage, getUserData } = useUserDataStore();
    const { isHydrated, accessToken } = useAuthStore();
    const { i18n } = useTranslation();

    useEffect(() => {
        if (language && i18n.language !== language) {
            i18n.changeLanguage(language);
        }
    }, [language, i18n]);

    useEffect(() => {
        if (isHydrated && accessToken) {
            fetchUserLanguage();
            if (getUserData) getUserData();
        }
    }, [isHydrated, accessToken]);

    return (
        <QueryClientProvider client={queryClient}>
            <InitialLayout />
        </QueryClientProvider>
    );
}
