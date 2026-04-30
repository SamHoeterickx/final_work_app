
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';

enum ELocales {
    EN = 'en',
    NL = 'nl',
    FR = 'fr'
}

const getDeviceLanguage = (): ELocales => {
    try{
        const languageCode = Localization.getLocales()[0]?.languageCode?.toLowerCase() || ELocales.NL;

        const supportedLocales = Object.values(ELocales) as string[];
        if(supportedLocales.includes(languageCode)) {
            return languageCode as ELocales
        }

    }catch(error){
        console.warn('Error fetching device language', error);
    }

    return ELocales.NL
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