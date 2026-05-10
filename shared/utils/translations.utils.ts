import * as Localization from 'expo-localization';

// TYPES
import { ELocales } from '../types/enums';

export const getDeviceLanguage = (): ELocales => {
    try {
        const languageCode =
            Localization.getLocales()[0]?.languageCode?.toLowerCase() || ELocales.NL;

        const supportedLocales = Object.values(ELocales) as string[];
        if (supportedLocales.includes(languageCode)) {
            return languageCode as ELocales;
        }
    } catch (error) {
        console.warn('Error fetching device language', error);
    }

    return ELocales.NL;
};
