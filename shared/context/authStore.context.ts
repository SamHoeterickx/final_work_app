import { create } from 'zustand';

// TYPES
import { IAuthStore, IGenerateCustomRoadmapResponse } from '../types/types';

export const useAuthStore = create<IAuthStore>((set) => ({
    accessToken: null,
    refreshToken: null,
    isHydrated: false,
    needsRoadmap: false,
    roadmapResponse: null,
    setTokens: (accessToken: string, refreshToken: string, needsRoadmap: boolean = false) =>
        set({ accessToken, refreshToken, needsRoadmap }),
    setNeedsRoadmap: (state: boolean) => set({ needsRoadmap: state }),
    setHydrated: (state: boolean) => set({ isHydrated: state }),
    setRoadmapResponse: (chapter: IGenerateCustomRoadmapResponse) =>
        set({ roadmapResponse: chapter }),
    logout: () => set({ accessToken: null, refreshToken: null, needsRoadmap: false }),
}));
