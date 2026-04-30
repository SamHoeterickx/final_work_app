import { NativeModules, Platform } from 'react-native';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

enum ELocales {
    EN = 'en',
    NL = 'nl',
    FR = 'fr'
}

const getDeviceLanguage = (): ELocales => {
    let deviceLanguage = 'nl';
    try {
        if (Platform.OS === 'ios') {
            const settings = NativeModules.SettingsManager.settings;
            deviceLanguage = settings.AppleLocale || settings.AppleLanguages?.[0] || 'nl';
        } else {
            deviceLanguage = NativeModules.I18nManager.localeIdentifier || 'nl';
        }
    } catch (error) {
        console.warn('Error fetching device language', error);
    }

    const langCode = deviceLanguage.split('_')[0].toLowerCase();
    const supportedLocales = Object.values(ELocales) as string[];
    
    return supportedLocales.includes(langCode) ? (langCode as ELocales) : ELocales.NL;
};

i18n
    .use(resourcesToBackend((language: string) => {
        switch(language) {
            case ELocales.EN:
                return import('@/locales/en.translation.json');
            case ELocales.FR:
                return import('@/locales/fr.translation.json');
            case ELocales.NL:
            default:
                return import('@/locales/nl.translation.json');
        }
    }))
    .use(initReactI18next)
    .init({
        lng: getDeviceLanguage(),
        fallbackLng: ELocales.NL,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;