import { create } from 'zustand';

// SERVICES
import { authService } from '../services/auth.service';

// TYPES
import { ELocales } from '../types/enums';
import { IUserDataStore } from '../types/types';

// UTILS
import { getDeviceLanguage, getPreferenceLanguage } from '../utils/translations.utils';

const deviceLanguage = getDeviceLanguage();

export const useUserDataStore = create<IUserDataStore>((set) => ({
    language: deviceLanguage,
    userData: null,
    name: '',
    email: '',
    streaks: 0,
    longestStreak: 0,
    xp: 0,
    setLanguage: (language: ELocales) => set({ language }),
    fetchUserLanguage: async () => {
        const pref = await getPreferenceLanguage();
        if (pref) {
            set({ language: pref });
        }
    },
    getUserData: async () => {
        try {
            const response = await authService.getUserData();
            console.log(response);
            set({
                userData: response?.getUserData || null,
                name: response?.getUserData.name,
                email: response?.getUserData.email,
                xp: response?.getUserData.xp ? parseInt(response.getUserData.xp, 10) : 0,
                streaks: response?.getUserData.streaks.currentStreak,
                longestStreak: response?.getUserData.streaks.longestStreak,
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    },
    setStreaks: (streak: number) => set({ streaks: streak })
}));
