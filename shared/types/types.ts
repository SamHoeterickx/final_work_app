import { StyleProp, TextInputProps, TouchableOpacityProps, ViewStyle } from "react-native";

// INTERFACES
export interface ILoginCredentials {
	email: string;
	password: string;
}

export interface IAuthStore {
	accessToken: string | null;
	refreshToken: string | null;
    isHydrated: boolean;
	setTokens: (accessToken: string, refreshToken: string) => void;
	logout: () => void;
    setHydrated: (state: boolean) => void;
}
 
export interface IRefreshTokensResponse {
	refreshTokens: {
		accessToken: string;
		refreshToken: string;
	};
};

export interface ILoginUserResponse {
	loginUser: {
		accessToken: string;
		refreshToken: string;
	};
};

export interface IOnboardingQuestions {
    title: string;
    description: string;
    kind: OnboardingQuestionKind,
    options: Record<string, any>
}

// ENUMS
export enum OnboardingQuestionKind {
    SINGLE_CHOICE = 'single_choice',
    MULTIPLE_TILES = 'multiple_tiles',
    MULTIPLE_CHOICE = 'multiple_choice',
    MULTIPLE_CHOICE_TITLE = 'multiple_choice_title'
}

// TYPES
export type TTokenRefreshSubscriber = (token: string | null) => void;

export type TGraphQLError = {
	message: string;
};

export type TGraphQLResponse<T = unknown> = {
	data?: T;
	errors?: TGraphQLError[];
};

// PROPS
export interface IButtonProps extends TouchableOpacityProps {
    copy: string;
    styles?: 'primary' | 'secundary';
    size?: 'small' | 'normal' | 'large'
    onPress: () => void;
}

export interface IInputFieldProps extends Omit<TextInputProps, 'onChangeText'>{
    onChangeText: (name: string, value: string) => void;
    placeholder: string;
    name: string;
}

export interface IOnboardingQuestionWrapperProps {
    kind: OnboardingQuestionKind
}