import { create } from "zustand";
import { ILessonStore } from "../types/types";

export const useLessonStore = create<ILessonStore>((set) => ({
    screenIndex: 0,
    setScreenIndex: (index: number) => set({ screenIndex: index })
}))