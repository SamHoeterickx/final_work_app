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
import { useUserPreferencesStore } from '@/shared/context/userPreferencesStore.context';

// STYLES
import { colors } from '@/shared/styles/design.system';

const queryClient = new QueryClient();

const InitialLayout = () => {
    const { accessToken, isHydrated, needsRoadmap, setHydrated, setTokens } = useAuthStore();

    const segments = useSegments();
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        'Vanguard-Thin': require('../assets/fonts/vanguard/vanguard-thin.otf'),
        'Vanguard-ThinOblique': require('../assets/fonts/vanguard/vanguard-thinoblique.otf'),
        'Vanguard-Light': require('../assets/fonts/vanguard/vanguard-light.otf'),
        'Vanguard-LightOblique': require('../assets/fonts/vanguard/vanguard-lightoblique.otf'),
        'Vanguard-Regular': require('../assets/fonts/vanguard/vanguard-regular.otf'),
        'Vanguard-RegularOblique': require('../assets/fonts/vanguard/vanguard-regularoblique.otf'),
        'Vanguard-Medium': require('../assets/fonts/vanguard/vanguard-medium.otf'),
        'Vanguard-MediumOblique': require('../assets/fonts/vanguard/vanguard-mediumoblique.otf'),
        'Vanguard-DemiBold': require('../assets/fonts/vanguard/vanguard-demibold.otf'),
        'Vanguard-DemiBoldOblique': require('../assets/fonts/vanguard/vanguard-demiboldoblique.otf'),
        'Vanguard-Bold': require('../assets/fonts/vanguard/vanguard-bold.otf'),
        'Vanguard-BoldOblique': require('../assets/fonts/vanguard/vanguard-boldoblique.otf'),
        'Vanguard-ExtraBold': require('../assets/fonts/vanguard/vanguard-extrabold.otf'),
        'Vanguard-ExtraBoldOblique': require('../assets/fonts/vanguard/vanguard-extraboldoblique.otf'),
        'Vanguard-Heavy': require('../assets/fonts/vanguard/vanguard-heavy.otf'),
        'Vanguard-HeavyOblique': require('../assets/fonts/vanguard/vanguard-heavyoblique.otf'),
    });

    useEffect(() => {
        const loadTokens = async () => {
            try {
                SecureStore.deleteItemAsync('accessToken');
                // FIXED: Typo 'refreshTOken' -> 'refreshToken'
                SecureStore.deleteItemAsync('refreshToken'); 
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

    // FIXED: Changed && to || so it waits for BOTH to finish loading before rendering
    if (!isHydrated || !fontsLoaded) {
        return null;
    }

    return (
        <Stack 
            screenOptions={{ 
                headerShown: false, 
                contentStyle: { backgroundColor: colors.background } 
            }} 
        />
    );
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