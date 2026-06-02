import { create } from 'zustand';

// TYPES
import { IOnboardingStore } from '../types/types';

export const useOnboardingStore = create<IOnboardingStore>((set) => ({
    onboardingCount: 0,
    answers: {},
    setOnboardingCount: (countOrUpdater) =>
        set((state) => ({
            onboardingCount:
                typeof countOrUpdater === 'function' ? countOrUpdater(state.onboardingCount) : countOrUpdater,
        })),
    toggleMultipleChoiceAnswer: (questionIndex: number, optionIndex: number) =>
        set((state) => {
            const currentAnswers = state.answers[questionIndex] || [];
            const newAnswers = currentAnswers.includes(optionIndex)
                ? currentAnswers.filter((i: number) => i !== optionIndex)
                : [...currentAnswers, optionIndex];
            return { answers: { ...state.answers, [questionIndex]: newAnswers } };
        }),
    setSingleChoiceAnswer: (questionIndex: number, optionIndex: number) =>
        set((state) => {
            return { answers: { ...state.answers, [questionIndex]: [optionIndex] } };
        }),
}));
