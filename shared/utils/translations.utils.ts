import * as Localization from 'expo-localization';

// TYPES
import { GET_PREFERENCE_LANGUAGE } from '../graphql/query';
import { ELocales } from '../types/enums';
import { graphqlFetch } from './api.utils';

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


export const getPreferenceLanguage = async(): Promise<ELocales> => {
    try {
        const languageCode = await graphqlFetch<{ getPreferenceLanguage: string }>(GET_PREFERENCE_LANGUAGE);
        
        console.log('---languageCode', languageCode)
        const pref = languageCode?.getPreferenceLanguage;
        return (pref?.toLowerCase() as ELocales) || ELocales.NL;
    } catch (error) {
        console.warn('Error fetching device language', error);
    }

    return ELocales.NL;
}