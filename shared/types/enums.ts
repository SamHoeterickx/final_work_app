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
    LOCKED = 'locked.svg',
    UNLOCKED = 'unlocked.svg',
    ARROW_LEFT_FULL = 'arrow_full_left.svg',
}

export enum EProgressStatus {
    LOCKED = 'LOCKED',
    UNLOCKED = 'UNLOCKED',
    INPROGRESS = 'INPROGRESS',
    COMPLETED = 'COMPLETED',
}
