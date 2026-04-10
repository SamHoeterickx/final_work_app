import { create } from 'zustand';
import { IAuthStore } from '../types/types';

export const useAuthStore = create<IAuthStore>((set) => ({
	accessToken: null,
	refreshToken: null,
	setTokens: (accessToken: string, refreshToken: string) =>
		set({ accessToken, refreshToken }),
	logout: () => set({ accessToken: null, refreshToken: null }),
}));
