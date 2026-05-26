import { ELocales, EProgressStatus, ERoles } from './enums';
import { ILessonTranslations, ITranslations, TGraphQLError } from './types';
import { IChapter, IUnlockedChapter, IUnlockedLesson } from './types';

export type TGraphQLResponse<T = unknown> = {
    data?: T;
    errors?: TGraphQLError[];
};

// AUTH RESPONSES
export interface IRefreshTokensResponse {
    accessToken: string;
    refreshToken: string;
}

export interface IResetPasswordResponse {
    accessToken: string;
    resfreshToken: string;
}

export interface IGetUserDataResponse {
    role: ERoles;
    name: string;
    email: string;
    xp: string;
    streaks: {
        uuid: string;
        currentStreak: number;
        lastCompletedDate: Date;
        longestStreak: number;
    };
}

export interface IUpdateUsernameResponse {
    updateUserName: boolean;
}

export interface IUpdateEmailResponse {
    updateEmail: boolean;
}

export interface IDeleteUserResponse {
    deleteUser: boolean;
}

export interface IUpdatePreferenceLanguageResponse {
    updatePreferenceLanguage: boolean;
}

// CHAPTER RESPONSES
export interface IGenerateCustomRoadmapResponse {
    uuid: string;
    slug: string;
    name: ITranslations;
    description: ITranslations;
    tags: string[];
    lessons: {
        uuid: string;
        order: number;
        translations: {
            languageCode: ELocales;
            name: string;
            description: string;
        }[];
    }[];
    created_at: Date;
}

export interface IGetMyChaptersResponse {
    uuid: string;
    order: number;
    status: EProgressStatus;
    chapter: IChapter;
    created_at: Date;
}

// LESSON RESPONSES
export interface IStartLessonResponse {
    uuid: string;
    estimatedDuration: number;
    xp: number;
    order: number;
    content: ILessonTranslations[];
}

export interface ICompleteLessonResponse {
    success: boolean;
    alreadyCompleted: boolean;
    message: string;
    newStreak: number;
    prevStreak: number;
    isStreakUpdated: boolean;
    newUserXP: number;
    prevUserXP: number;
    isLastLesson: boolean;
    newUnlockedLesson: IUnlockedLesson | null;
    newUnlockedChapter: IUnlockedChapter | null;
    streak: {
        uuid: string;
        currentStreak: number;
        longestStreak: number;
        lastCompletedDate: Date;
    };
}
