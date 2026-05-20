import { TextInputProps, TouchableOpacityProps } from 'react-native';

// ENUMS
import {
    ELessonScreenOptions,
    ELocales,
    EOnboardingQuestionKind,
    EProgressStatus,
    ESettingsOptions,
    ESvgIconName,
} from './enums';

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
export interface IUpdateUsernameCredentials {
    updatedUsername: string;
}

export interface IUpdateEmailCredentials {
    updatedEmailAdress: string;
}
export interface IDeleteUserCredentials {
    password: string;
}

export interface IStartLessonCredentials {
    lessonUuid: string;
    languageCode: ELocales;
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
    fetchUserLanguage: () => Promise<void>;
}

export interface ILessonStore {
    screenIndex: number;
    isLessonCompleted: boolean;
    setScreenIndex: (index: number) => void;
    setIsLessonCompleted: (state: boolean) => void;
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
    kind: EOnboardingQuestionKind;
    options: IQuestionOption[];
}

export interface IErrorData {
    error: string;
    isError: boolean;
}

export interface IChapter {
    uuid: string;
    name: {
        en: string;
        nl: string;
        fr: string;
    };
    description: {
        en: string;
        nl: string;
        fr: string;
    };
    slug: string;
    lessons: ILessonsChapter[];
    created_at: string;
}

export interface IChapterUser {
    chapter: IChapter;
    created_at: string;
    order: number;
    status: EProgressStatus;
    uuid: string;
}

export interface ILessonsChapter {
    uuid: string;
    status: EProgressStatus;
    order: number;
    translations: any;
}

export interface IStartLessonResponse {
    uuid: string;
    estimatedDuration: number;
    xp: number;
    order: number;
    content: ILessonTranslations[];
}

export interface ILessonTranslations {
    uuid?: string | null;
    languageCode: ELocales;
    name: string;
    description: string;
    content: any[],
}

export interface IQuestionOption {
    label: string;
    tag: string;
    image?: string | null;
    description?: string | null;
}

// TYPES
export type TTokenRefreshSubscriber = (token: string | null) => void;

export type TGraphQLError = {
    message: string;
    extensions?: {
        code?: string;
    };
};

export type TGraphQLResponse<T = unknown> = {
    data?: T;
    errors?: TGraphQLError[];
};

// PROPS
export interface IButtonProps extends TouchableOpacityProps {
    copy: string;
    icon?: ESvgIconName;
    styles?: 'primary' | 'secundary';
    size?: 'small' | 'normal' | 'large';
    onPress: () => void;
}

export interface IInputFieldProps extends Omit<TextInputProps, 'onChangeText'> {
    onChangeText: (name: string, value: string) => void;
    placeholder: string;
    name: string;
}

export interface IOnboardingQuestionWrapperProps {
    kind: EOnboardingQuestionKind;
    options: IQuestionOption[];
}

export interface IQuestionProps {
    options: IQuestionOption[];
    questionIndex: number;
}

export interface IBackButtonProps {
    style?: Record<string, any>;
    isFocused?: boolean;
    setIsFocused?: (state: boolean) => void;
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

export interface IChapterProps {
    chapterUser: IChapterUser;
    isFocused: boolean;
    setIsFocused: (state: boolean) => void;
}
export interface IGeneratingRoadmapProps {
    onsuccess: () => void;
}

export interface IChapterActionsProps {
    status: EProgressStatus;
    isFocused: boolean;
    onPress: () => void;
}

export interface IChapterHeaderProps {
    chapterUser: IChapterUser;
    isFocused: boolean;
    selectedLesson: ILessonsChapter | null;
}

export interface IChapterSceneProps {
    isFocused: boolean;
    cameraPos: [number, number, number];
    cameraTarget: [number, number, number];
    lessons: ILessonsChapter[];
    onLessonClick: (index: number, lesson: ILessonsChapter) => void;
}

export interface ICameraControllerProps {
    position: [number, number, number];
    target: [number, number, number];
}

export interface IFloatingGroupProps {
    isFocused: boolean;
    children: React.ReactNode;
}

export interface IChapterProgressProps {
    lessons: ILessonsChapter[];
}

export interface ILessonStatusProps {
    lesson: ILessonsChapter;
}

export interface ISettingTabProps {
    copy: string;
    icon?: ESvgIconName;
    path: string;
}

export interface ISettingsOptionsWrapperProps {
    option: ESettingsOptions;
}

export interface IChangePasswordSettingsProps {
    resetCode?: string;
    email?: string;
}

export interface IModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (state: boolean) => void;
}

export interface ILessonHeaderProps {
    screenCount: number;
    totalScreens: number | undefined;
    isModalOpen: boolean;
    setIsModalOpen: (state: boolean) => void;
    onBackPress: () => void;
}

export interface ILessonScreenOptionsWrapperProps {
    screenType: ELessonScreenOptions;
    lessonContent: any;
    subStep?: number;
}

export interface ILessonScreenProps {
    content: any;
    subStep?: number;
}