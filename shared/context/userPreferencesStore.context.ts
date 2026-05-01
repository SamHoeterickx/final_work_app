import { create } from 'zustand';

// TYPES
import { ELocales, IUserPreferencesStore } from '../types/types';
import { getDeviceLanguage } from '../utils/translations.utils';

const deviceLanguage = getDeviceLanguage();

export const useUserPreferencesStore = create<IUserPreferencesStore>((set) => ({
    language: deviceLanguage,
    setLanguage: (language: ELocales) => set({ language }),
}));
