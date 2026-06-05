import * as Localization from 'expo-localization';

// QUERIES
import { GET_PREFERENCE_LANGUAGE } from '../graphql/query';

// UTILS
import { graphqlFetch } from './api.utils';

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

export const getPreferenceLanguage = async (): Promise<ELocales> => {
    try {
        const response = await graphqlFetch<{ getPreferenceLanguage: string }>(
            GET_PREFERENCE_LANGUAGE,
        );

        const pref = response?.getPreferenceLanguage;
        return (pref?.toLowerCase() as ELocales) || ELocales.NL;
    } catch (error) {
        console.warn('Error fetching device language', error);
    }

    return ELocales.NL;
};
