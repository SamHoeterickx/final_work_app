import { TextInputProps, TouchableOpacityProps } from 'react-native';

// INTERFACES
export interface ILoginCredentials {
    email: string;
    password: string;
}

export interface IRegisterCredentials {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
}

export interface IRequestResetCodeCredentials {
    email: string;
}

export interface IVerifyResetCodeCredentials {
    resetCode: string;
    email: string;
}

export interface INewPasswordCredentials {
    oldPassword: string | null;
    newPassword: string;
    repeatNewPassword: string;
}

export interface IChangePasswordWithResetCodeCredentials {
    resetCode: string;
    email: string;
    newPassword: string;
    repeatNewPassword: string;
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

export interface IUserPreferencesStore {
    language: ELocales;
    setLanguage: (language: ELocales) => void;
}

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

export interface IOnboardingQuestions {
    title: string;
    description: string;
    kind: OnboardingQuestionKind;
    options: IQuestionOption[];
}

export interface IErrorData {
    error: string;
    isError: boolean;
}

// ENUMS
export enum OnboardingQuestionKind {
    MULTIPLE_TILES = 'multiple_tiles',
    SINGLE_CHOICE = 'single_choice',
    SINGLE_CHOICE_TITLE = 'single_choice_title',
    SINGLE_CHOICE_IMG = 'single_choice_img',
}

export enum ELocales {
    EN = 'en',
    NL = 'nl',
    FR = 'fr',
}

export enum EFlowStep {
    'GENERATING',
    'SUCCESS',
    'CHAPTER_UNLOCKED',
    'START_LEARNING',
}

export enum ESvgIconName {
    FILTER_COFFEE = 'filter_coffee.svg',
    FULL_AUTOMATIC = 'full_automatic_machine.svg',
    ESPRESSO_MACHINE = 'espresso_machine.svg',
    CUP_MACHINE = 'cup_machine.svg',
    FRENCH_PRESS = 'french_press.svg',
    COFFEE_SHOP = 'coffee_shop.svg',
    MOKA_POT = 'moka_pot.svg',
    POUR_OVER = 'pour_over.svg',
    CHEMEX = 'chemex.svg',
    BEAN_MILL = 'bean_mil.svg',
    MILK_FOAMER = 'milk_foamer.svg',
    GOOSENECK_KETTLE = 'gooseneck_kettle.svg',
    BEAN_1 = '1_bean.svg',
    BEAN_2 = '2_beans.svg',
    BEAN_3 = '3_beans.svg',
    BEAN_4 = '4_beans.svg',
    LOCKED = 'locked',
    UNLOCKED = 'unlocked',
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
    icon?: ESvgIconName
    styles?: 'primary' | 'secundary';
    size?: 'small' | 'normal' | 'large';
    onPress: () => void;
}

export interface IInputFieldProps extends Omit<TextInputProps, 'onChangeText'> {
    onChangeText: (name: string, value: string) => void;
    placeholder: string;
    name: string;
}

export interface IQuestionOption {
    label: string;
    tag: string;
    image?: string | null;
    description?: string | null;
}

export interface IOnboardingQuestionWrapperProps {
    kind: OnboardingQuestionKind;
    options: IQuestionOption[];
}

export interface IQuestionProps {
    options: IQuestionOption[];
    questionIndex: number;
}

export interface IBackButtonProps {
    style?: Record<string, any>;
}

export interface IPostOnboardingFlowProps {
    handleNext: () => void;
}

export interface IChapterUnlockedProps extends IPostOnboardingFlowProps {
    chapter: string;
    islandPath: string;
}
export interface IStartLearningProps extends IPostOnboardingFlowProps {
    name: string;
    description: string;
}

export interface IIslandModelProps {
    islandPath: string;
    scale?: number;
}
