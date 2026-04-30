import { create } from 'zustand';
import { IOnboardingStore } from '../types/types';

export const useOnboardingStore = create<IOnboardingStore>((set) => ({
    answers: {},
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
