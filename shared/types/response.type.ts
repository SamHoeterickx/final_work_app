// RESPONSES

import { ELocales } from "./enums";
import { ILessonTranslations, ITranslations, TGraphQLError } from "./types";

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