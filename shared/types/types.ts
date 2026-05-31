import { TextInputProps, TouchableOpacityProps } from 'react-native';

// ENUMS
import {
    ELessonScreenOptions,
    ELocales,
    EOnboardingQuestionKind,
    EProgressStatus,
    ERoles,
    ESettingsOptions,
    ESvgIconName,
} from './enums';
import { IGenerateCustomRoadmapResponse, IGetMyChaptersResponse } from './response.type';

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

export interface ILessonCredentials {
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
    roadmapResponse: IGenerateCustomRoadmapResponse | null;
    setTokens: (accessToken: string, refreshToken: string, needsRoadmap: boolean) => void;
    setNeedsRoadmap: (state: boolean) => void;
    setRoadmapResponse: (chapter: IGenerateCustomRoadmapResponse) => void;
    setHydrated: (state: boolean) => void;
    logout: () => void;
}

export interface IOnboardingStore {
    answers: Record<number, number[]>;
    toggleMultipleChoiceAnswer: (questionIndex: number, optionIndex: number) => void;
    setSingleChoiceAnswer: (questionIndex: number, optionIndex: number) => void;
}

export interface IHomeStore {
    allChapters: IGetMyChaptersResponse[] | null;
    chapterIndex: number;
    activeChapterIndex: number;
    aChapterStatus: EProgressStatus | null;
    returnToCurrentChapter: () => void;
    updateChapterIndex: (index: number) => void;
    setAllChapters: (chapters: IGetMyChaptersResponse[]) => void;
}

export interface IUserDataStore {
    language: ELocales;
    userData: IUserData | null;
    name: string;
    email: string;
    xp: number;
    streaks: number;
    longestStreak: number;
    setLanguage: (language: ELocales) => void;
    fetchUserLanguage: () => Promise<void>;
    getUserData: () => Promise<void>;
    setStreaks: (streak: number) => void;
}

export interface ILessonStore {
    screenIndex: number;
    isLessonCompleted: boolean;
    setScreenIndex: (index: number) => void;
    setIsLessonCompleted: (state: boolean) => void;
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

export interface IUserData {
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

export interface IChapter {
    uuid: string;
    name: ITranslations;
    description: ITranslations;
    tags: string[];
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
    translations: ILessonTranslations | ILessonTranslations[];
}

export interface IUnlockedLesson {
    uuid: string;
    status: EProgressStatus;
    order: number;
    translations: {
        name: string;
        languageCode: ELocales;
        description: string;
    };
}

export interface IUnlockedChapter {
    uuid: string;
    name: string;
    slug: string;
    description: string;
}

export interface ILessonTranslations {
    uuid?: string | null;
    name: string;
    description: string;
    languageCode: ELocales;
    content: any[];
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

export interface IIslandModelProps {
    islandPath: string;
    scale?: number;
}

export interface IChapterProps {
    chapterUser: IGetMyChaptersResponse;
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
    chapterUser: IGetMyChaptersResponse;
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
    quizError: string | null;
    onAnswerSelect?: (option: string) => void;
}

export interface ILessonScreenProps {
    content: any;
    subStep?: number;
    quizError?: string | null;
    onAnswerSelect?: (option: string) => void;
}

export interface IPostLessonFlowProps {
    data: any;
    currentStep: string;
}

export interface IXpFlowProps {
    newUserXP: number;
    prevUserXP: number;
}

export interface IStreaksFlowProps {
    newStreak: number;
}

export interface ILessonUnlockedProps {
    lesson: {
        status: 'UNLOCKED';
        uuid: string;
        translations: [
            {
                name: string;
                description: string;
                languageCode: ELocales;
            },
        ];
    };
}

export interface ILessonMeshProps {
    position: [number, number, number];
    isLocked: boolean;
    isCurrent: boolean;
    delay: number;
    onClick: () => void;
}

export interface IFloatingIslandProps {
    scale?: [number, number, number] | number;
    position?: [number, number, number];
    animation: boolean;
}

export interface ITranslations {
    nl: string;
    en: string;
    fr: string;
}
