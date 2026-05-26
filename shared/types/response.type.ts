import { ELocales, EProgressStatus } from "./enums";
import { ILessonTranslations, ITranslations, TGraphQLError } from "./types";
import { IChapter, IUnlockedChapter, IUnlockedLesson } from "./types";

// RESPONSES
export interface IRefreshTokensResponse {
    refreshTokens: {
        accessToken: string;
        refreshToken: string;
    };
}

export interface ILoginUserResponse {
    loginUser: {
        accessToken: string;
        refreshToken: string;
    };
}

export interface IStartLessonResponse {
    uuid: string;
    estimatedDuration: number;
    xp: number;
    order: number;
    content: ILessonTranslations[];
}

export type TGraphQLResponse<T = unknown> = {
    data?: T;
    errors?: TGraphQLError[];
};

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

export interface IResetPasswordResponse {
    accessToken: string;
    resfreshToken: string;   
}

export interface ICompleteLessonResponse  {
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
    newUnlockedChapter:  IUnlockedChapter | null;
    streak: {
        uuid: string;
        currentStreak: number;  
        longestStreak: number;
        lastCompletedDate: Date
    };
}

export interface IGetMyChaptersResponse  {
    uuid: string;
    order: number;
    status: EProgressStatus;
    chapter: IChapter
    created_at: Date;
}