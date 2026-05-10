import { create } from 'zustand';

// TYPES
import { IUserPreferencesStore } from '../types/types';
import { ELocales } from '../types/enums';

// UTILS
import { getDeviceLanguage } from '../utils/translations.utils';

const deviceLanguage = getDeviceLanguage();

export const useUserPreferencesStore = create<IUserPreferencesStore>((set) => ({
    language: deviceLanguage,
    setLanguage: (language: ELocales) => set({ language }),
}));
