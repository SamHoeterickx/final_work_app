// ENUMS
export enum EOnboardingQuestionKind {
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
    FILTER_COFFEE = 'filter_coffee',
    FULL_AUTOMATIC = 'full_automatic_machine',
    ESPRESSO_MACHINE = 'espresso_machine',
    CUP_MACHINE = 'cup_machine',
    FRENCH_PRESS = 'french_press',
    COFFEE_SHOP = 'coffee_shop',
    MOKA_POT = 'moka_pot',
    POUR_OVER = 'pour_over',
    CHEMEX = 'chemex',
    BEAN_MILL = 'bean_mil',
    MILK_FOAMER = 'milk_foamer',
    GOOSENECK_KETTLE = 'gooseneck_kettle',
    BEAN_1 = '1_bean',
    BEAN_2 = '2_beans',
    BEAN_3 = '3_beans',
    BEAN_4 = '4_beans',
    LOCKED = 'locked',
    UNLOCKED = 'unlocked',
    ARROW_LEFT_FULL = 'arrow_full_left',
    HOME = 'home',
    ACCOUNT = 'account',
    CHAPTERS = 'chapters',
    SETTINGS = 'settings',
    NOTIFICATIONS = 'notifications',
    LEGAL = 'legal',
    PRIVACY = 'privacy',
    INFO = 'info'
}

export enum EProgressStatus {
    LOCKED = 'LOCKED',
    UNLOCKED = 'UNLOCKED',
    INPROGRESS = 'INPROGRESS',
    COMPLETED = 'COMPLETED',
}

export enum ESettingsOptions {
    PROFILE = 'profile',
    CHANGE_LANGUAGE = 'changeLanguage',
    NOTIFICATIONS = 'notifications',
    ABOUT = 'about',
    PRIVACY_POLICY = 'privacyPolicy',
    TERMS_OF_CONDITION = 'termsOfCondition'
}