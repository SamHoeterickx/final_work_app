import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

// TYPES
import { ELocales } from './shared/types/enums';

i18n.use(
    resourcesToBackend((language: string) => {
        switch (language) {
            case ELocales.EN:
                return import('@/locales/en.translation.json');
            case ELocales.FR:
                return import('@/locales/fr.translation.json');
            case ELocales.NL:
            default:
                return import('@/locales/nl.translation.json');
        }
    }),
)
    .use(initReactI18next)
    .init({
        fallbackLng: ELocales.NL,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
