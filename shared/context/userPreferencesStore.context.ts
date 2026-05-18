import { create } from 'zustand';

// TYPES
import { ELocales } from '../types/enums';
import { IUserPreferencesStore } from '../types/types';

// UTILS
import { getDeviceLanguage, getPreferenceLanguage } from '../utils/translations.utils';

const deviceLanguage = getDeviceLanguage();

export const useUserPreferencesStore = create<IUserPreferencesStore>((set) => ({
    language: deviceLanguage,
    setLanguage: (language: ELocales) => set({ language }),
    fetchUserLanguage: async () => {
        const pref = await getPreferenceLanguage();
        if (pref) {
            set({ language: pref });
        }
    },
}));
