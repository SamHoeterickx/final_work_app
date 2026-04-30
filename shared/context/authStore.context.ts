import { create } from 'zustand';
import { IAuthStore } from '../types/types';

export const useAuthStore = create<IAuthStore>((set) => ({
  accessToken: null,
  refreshToken: null,
  isHydrated: false,
  needsRoadmap: false,
  setTokens: (accessToken: string, refreshToken: string, needsRoadmap: boolean = false) =>
    set({ accessToken, refreshToken, needsRoadmap }),
  setNeedsRoadmap: (state: boolean) => set({ needsRoadmap: state }),
  setHydrated: (state: boolean) => set({ isHydrated: state }),
  logout: () => set({ accessToken: null, refreshToken: null, needsRoadmap: false }),
}));
