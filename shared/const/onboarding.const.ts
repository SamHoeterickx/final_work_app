import { IOnboardingAnswers, IOnboardingQuestions } from '../types/types';
import { EOnboardingQuestionKind } from '../types/enums';

export const onboardingQuestions: IOnboardingQuestions[] = [
    {
        title: 'onboarding.currentBehaviour.title',
        description: 'onboarding.currentBehaviour.subtitle',
        kind: EOnboardingQuestionKind.MULTIPLE_TILES,
        options: [
            {
                label: 'onboarding.currentBehaviour.optionLabels.wholeBeans',
                tag: 'coffee_whole_beans',
                image: 'beans_bag',
            },
            {
                label: 'onboarding.currentBehaviour.optionLabels.preGround',
                tag: 'coffee_pre_ground',
                image: 'ground_coffee',
            },
            {
                label: 'onboarding.currentBehaviour.optionLabels.convenience',
                tag: 'coffee_convenience',
                image: 'cup_machine',
            },
            {
                label: 'onboarding.currentBehaviour.optionLabels.coffeeShop',
                tag: 'coffee_shop_lover',
                image: 'coffee_shop',
            },
        ],
    },
    {
        title: 'onboarding.experienceLevel.title',
        description: 'onboarding.experienceLevel.subtitle',
        kind: EOnboardingQuestionKind.SINGLE_CHOICE_IMG,
        options: [
            {
                label: 'onboarding.experienceLevel.optionLabels.tasteEnjoyer',
                tag: 'level_beginner',
                description: 'onboarding.experienceLevel.optionDescriptions.tasteEnjoyer',
                image: '1_bean',
            },
            {
                label: 'onboarding.experienceLevel.optionLabels.curious',
                tag: 'level_intermediate',
                description: 'onboarding.experienceLevel.optionDescriptions.curious',
                image: '2_beans',
            },
            {
                label: 'onboarding.experienceLevel.optionLabels.connoisseur',
                tag: 'level_advanced',
                description: 'onboarding.experienceLevel.optionDescriptions.connoisseur',
                image: '3_beans',
            },
        ],
    },
    {
        title: 'onboarding.goal.title',
        description: 'onboarding.goal.subtitle',
        kind: EOnboardingQuestionKind.SINGLE_CHOICE,
        options: [
            {
                label: 'onboarding.goal.optionLabels.tastingSkills',
                tag: 'goal_tasting',
            },
            {
                label: 'onboarding.goal.optionLabels.perfectEspresso',
                tag: 'goal_espresso',
            },
            {
                label: 'onboarding.goal.optionLabels.latteArt',
                tag: 'goal_latte_art',
            },
            {
                label: 'onboarding.goal.optionLabels.beanToCup',
                tag: 'goal_bean_to_cup',
            },
        ],
    },
    {
        title: 'onboarding.currentPreferences.title',
        description: 'onboarding.currentPreferences.subtitle',
        kind: EOnboardingQuestionKind.SINGLE_CHOICE,
        options: [
            {
                label: 'onboarding.currentPreferences.optionLabels.boldClassic',
                tag: 'pref_bold_classic',
            },
            {
                label: 'onboarding.currentPreferences.optionLabels.milkBalanced',
                tag: 'pref_milk_balanced',
            },
            {
                label: 'onboarding.currentPreferences.optionLabels.fruityAcidic',
                tag: 'pref_fruity_acidic',
            },
            {
                label: 'onboarding.currentPreferences.optionLabels.versatile',
                tag: 'pref_versatile',
            },
        ],
    },
    {
        title: 'onboarding.desiredTempo.title',
        description: 'onboarding.desiredTempo.subtitle',
        kind: EOnboardingQuestionKind.SINGLE_CHOICE_TITLE,
        options: [
            {
                label: 'onboarding.desiredTempo.optionLabels.quickShot',
                tag: 'quick_shot',
                description: 'onboarding.desiredTempo.optionDescriptions.quickShot',
            },
            {
                label: 'onboarding.desiredTempo.optionLabels.dailyRoutine',
                tag: 'daily_routine',
                description: 'onboarding.desiredTempo.optionDescriptions.dailyRoutine',
            },
            {
                label: 'onboarding.desiredTempo.optionLabels.weekendLover',
                tag: 'weekend_lover',
                description: 'onboarding.desiredTempo.optionDescriptions.weekendLover',
            },
            {
                label: 'onboarding.desiredTempo.optionLabels.ownPace',
                tag: 'own_pace',
                description: 'onboarding.desiredTempo.optionDescriptions.ownPace',
            },
        ],
    },
    {
        title: 'onboarding.currentMethodes.title',
        description: 'onboarding.currentMethodes.subtitle',
        kind: EOnboardingQuestionKind.MULTIPLE_TILES,
        options: [
            {
                label: 'onboarding.currentMethodes.optionLabels.espressoMachine',
                tag: 'method_espresso',
                image: 'espresso_machine',
            },
            {
                label: 'onboarding.currentMethodes.optionLabels.pourOver',
                tag: 'method_pour_over',
                image: 'pour_over',
            },
            {
                label: 'onboarding.currentMethodes.optionLabels.mokaPot',
                tag: 'method_moka_pot',
                image: 'moka_pot',
            },
            {
                label: 'onboarding.currentMethodes.optionLabels.immersion',
                tag: 'method_immersion',
                image: 'aeroPress',
            },
            {
                label: 'onboarding.currentMethodes.optionLabels.frenchPress',
                tag: 'method_immersion',
                image: 'french_press',
            },
            {
                label: 'onboarding.currentMethodes.optionLabels.none',
                tag: 'none',
                image: 'cross',
            },
        ],
    },
    {
        title: 'onboarding.extraGear.title',
        description: 'onboarding.extraGear.subtitle',
        kind: EOnboardingQuestionKind.MULTIPLE_TILES,
        options: [
            {
                label: 'onboarding.extraGear.optionLabels.coffeeGrinder',
                tag: 'gear_grinder',
                image: 'bean_mill',
            },
            {
                label: 'onboarding.extraGear.optionLabels.precisionScale',
                tag: 'gear_scale',
                image: 'scale',
            },
            {
                label: 'onboarding.extraGear.optionLabels.gooseneckKettle',
                tag: 'gear_kettle',
                image: 'gooseneck_kettle',
            },
            {
                label: 'onboarding.extraGear.optionLabels.milkFrother',
                tag: 'gear_milk_frother',
                image: 'milk_foamer',
            },
            {
                label: 'onboarding.extraGear.optionLabels.puckPrep',
                tag: 'gear_puck_prep',
                image: 'puck_prep',
            },
            {
                label: 'onboarding.extraGear.optionLabels.none',
                tag: 'none',
                image: 'cross',
            },
        ],
    },
];

export const refactorOnboardingSelection = (
    answers: Record<number, number[]>,
): IOnboardingAnswers => {
    const getSelectedTags = (questionIndex: number): string[] => {
        const optionIndices = answers[questionIndex] || [];
        if (optionIndices.length === 0) {
            return [];
        }
        const question = onboardingQuestions[questionIndex];
        return optionIndices.map((optionIndex) => question.options[optionIndex].tag as string);
    };

    const getSingleChoiceTag = (questionIndex: number): string | null => {
        const tags = getSelectedTags(questionIndex);
        return tags.length > 0 ? tags[0] : null;
    };

    const getMultipleChoiceTags = (questionIndex: number): string[] => {
        const tags = getSelectedTags(questionIndex);
        if (tags.includes('none')) {
            return [];
        }
        return tags;
    };

    const getMultipleChoiceTagsOrNull = (questionIndex: number): string[] | null => {
        const tags = getSelectedTags(questionIndex);
        if (tags.includes('none') || tags.length === 0) {
            return null;
        }
        return tags;
    };

    return {
        currentBehaviour: getMultipleChoiceTags(0),
        experienceLevel: getSingleChoiceTag(1),
        goal: getSingleChoiceTag(2),
        currentPreferences: getSingleChoiceTag(3),
        desiredTempo: getSingleChoiceTag(4),
        currentMethodes: getMultipleChoiceTags(5),
        extraGear: getMultipleChoiceTagsOrNull(6),
    };
};
