import { TextInputProps, TouchableOpacityProps } from "react-native";

// INTERFACES
export interface ILoginCredentials {
	email: string;
	password: string;
}

export interface IRegisterCredentials {
    name: string;
    email: string;
    password: string,
    repeatPassword: string;
}

export interface IRequestResetCodeCredentials {
    email: string;
}

export interface IVerifyResetCodeCredentials {
    resetCode: string;
    email: string;
}

export interface IRegisterVariables {
    credentials: IRegisterCredentials;
    onboarding: IOnboardingAnswers;
}

export interface IOnboardingAnswers {
    currentBehaviour: string[];
    experienceLevel: string | null;
    goal: string | null;
    currentPreferences: string | null;
    desiredTempo: string | null;
    currentMethodes: string[];
    extraGear: string[] | null;
}

export interface IAuthStore {
	accessToken: string | null;
	refreshToken: string | null;
    isHydrated: boolean;
    needsRoadmap: boolean;
	setTokens: (accessToken: string, refreshToken: string, needsRoadmap: boolean) => void;
	setNeedsRoadmap: (state: boolean) => void;
    setHydrated: (state: boolean) => void;
	logout: () => void;
}

export interface IOnboardingStore {
    answers: Record<number, number[]>;
    toggleMultipleChoiceAnswer: (questionIndex: number, optionIndex: number) => void;
    setSingleChoiceAnswer: (questionIndex: number, optionIndex: number) => void;
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
    options: IQuestionOption[]
}

// ENUMS
export enum OnboardingQuestionKind {
    MULTIPLE_TILES = 'multiple_tiles',
    SINGLE_CHOICE = 'single_choice',
    SINGLE_CHOICE_TITLE = 'single_choice_title',
    SINGLE_CHOICE_IMG = 'single_choice_img'
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

export interface IQuestionOption {
    label: string;
    image?: string | null;
    description?: string | null;
}

export interface IOnboardingQuestionWrapperProps {
    kind: OnboardingQuestionKind;
    options: IQuestionOption[]
}

export interface IQuestionProps {
    options: IQuestionOption[],
    questionIndex: number
}