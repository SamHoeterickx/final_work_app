import { create } from 'zustand';

// TYPES
import { ILessonStore } from '../types/types';

export const useLessonStore = create<ILessonStore>((set) => ({
    screenIndex: 0,
    setScreenIndex: (index: number) => set({ screenIndex: index }),
    isLessonCompleted: false,
    setIsLessonCompleted: (state: boolean) => set({ isLessonCompleted: state }),
    subStep: 0,
    selectedOption: null,
    quizError: null,
    setSubStep: (stepOrUpdater) =>
        set((state) => ({
            subStep:
                typeof stepOrUpdater === 'function' ? stepOrUpdater(state.subStep) : stepOrUpdater,
        })),
    setSelectedOption: (option) => set({ selectedOption: option }),
    setQuizError: (error) => set({ quizError: error }),
}));
