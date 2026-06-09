import { create } from 'zustand';

// TYPES
import { IGenerateCustomRoadmapResponse } from '../types/response.type';
import { IAuthStore } from '../types/types';

export const useAuthStore = create<IAuthStore>((set) => ({
    isAuthenticated: false,
    isHydrated: false,
    needsRoadmap: false,
    roadmapResponse: null,
    setAuthenticated: (isAuthenticated: boolean, needsRoadmap: boolean = false) =>
        set({ isAuthenticated, needsRoadmap }),
    setNeedsRoadmap: (state: boolean) => set({ needsRoadmap: state }),
    setHydrated: (state: boolean) => set({ isHydrated: state }),
    setRoadmapResponse: (chapter: IGenerateCustomRoadmapResponse) =>
        set({ roadmapResponse: chapter }),
    logout: () => set({ isAuthenticated: false, needsRoadmap: false }),
}));
