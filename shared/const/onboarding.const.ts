import { IOnboardingAnswers, IOnboardingQuestions, OnboardingQuestionKind } from "../types/types";

export const onboardingQuestions: IOnboardingQuestions[] = [
    {
        title: 'onboarding.currentBehaviour.title',
        description: 'onboarding.currentBehaviour.subtitle',
        kind: OnboardingQuestionKind.MULTIPLE_TILES,
        options: [
            {
                label: 'onboarding.currentBehaviour.optionLabels.instantCoffee',
                tag: 'instant_coffee',
                image: 'filter_coffee.svg'
            },
            {
                label: 'onboarding.currentBehaviour.optionLabels.work',
                tag: 'work',
                image: 'full_automatic_machine.svg'
            },
            {
                label: 'onboarding.currentBehaviour.optionLabels.espresso',
                tag: 'espresso',
                image: 'espresso_machine.svg'
            },
            {
                label: 'onboarding.currentBehaviour.optionLabels.podMachine',
                tag: 'pod_machine',
                image: 'cup_machine.svg'
            },
            {
                label: 'onboarding.currentBehaviour.optionLabels.frenchPress',
                tag: 'french_press',
                image: 'french_press.svg'
            },
            {
                label: 'onboarding.currentBehaviour.optionLabels.coffeeShop',
                tag: 'coffee_shop',
                image: 'coffee_shop.svg'
            },
        ],
    },
    {
        title: 'onboarding.experienceLevel.title',
        description: 'onboarding.experienceLevel.subtitle',
        kind: OnboardingQuestionKind.SINGLE_CHOICE_IMG,
        options: [
            {
                label: 'onboarding.experienceLevel.optionLabels.tasteEnjoyer',
                tag: 'taste_enjoyer',
                description: 'onboarding.experienceLevel.optionDescriptions.tasteEnjoyer',
                image: '1_bean.svg'
            },
            {
                label: 'onboarding.experienceLevel.optionLabels.curious',
                tag: 'curious',
                description: 'onboarding.experienceLevel.optionDescriptions.curious',
                image: '2_beans.svg'
            },
            {
                label: 'onboarding.experienceLevel.optionLabels.connoisseur',
                tag: 'connoisseur',
                description: 'onboarding.experienceLevel.optionDescriptions.connoisseur',
                image: '3_beans.svg'
            },
            {
                label: 'onboarding.experienceLevel.optionLabels.experimenter',
                tag: 'experimenter',
                description: 'onboarding.experienceLevel.optionDescriptions.experimenter',
                image: '4_beans.svg'
            }
        ]
    },
    {
        title: 'onboarding.goal.title',
        description: 'onboarding.goal.subtitle',
        kind: OnboardingQuestionKind.SINGLE_CHOICE,
        options: [
            {
                label: 'onboarding.goal.optionLabels.tastingSkills',
                tag: 'tasting_skills'
            },
            {
                label: 'onboarding.goal.optionLabels.perfectEspresso',
                tag: 'perfect_espresso'
            },
            {
                label: 'onboarding.goal.optionLabels.latteArt',
                tag: 'latte_art'
            },
            {
                label: 'onboarding.goal.optionLabels.beanToCup',
                tag: 'bean_to_cup'
            }
        ]
    },
    {
        title: 'onboarding.currentPreferences.title',
        description: 'onboarding.currentPreferences.subtitle',
        kind: OnboardingQuestionKind.SINGLE_CHOICE,
        options: [
            {
                label: 'onboarding.currentPreferences.optionLabels.boldClassic',
                tag: 'bold_classic'
            },
            {
                label: 'onboarding.currentPreferences.optionLabels.milkBalanced',
                tag: 'milk_balanced'
            },
            {
                label: 'onboarding.currentPreferences.optionLabels.versatile',
                tag: 'versatile'
            },
            {
                label: 'onboarding.currentPreferences.optionLabels.fruityAcidic',
                tag: 'fruity_acidic'
            }
        ]
    },
    {
        title: 'onboarding.desiredTempo.title',
        description: 'onboarding.desiredTempo.subtitle',
        kind: OnboardingQuestionKind.SINGLE_CHOICE_TITLE,
        options: [
            {
                label: 'onboarding.desiredTempo.optionLabels.quickShot',
                tag: 'quick_shot',
                description: 'onboarding.desiredTempo.optionDescriptions.quickShot'
            },
            {
                label: 'onboarding.desiredTempo.optionLabels.dailyRoutine',
                tag: 'daily_routine',
                description: 'onboarding.desiredTempo.optionDescriptions.dailyRoutine'
            },
            {
                label: 'onboarding.desiredTempo.optionLabels.weekendLover',
                tag: 'weekend_lover',
                description: 'onboarding.desiredTempo.optionDescriptions.weekendLover'
            },
            {
                label: 'onboarding.desiredTempo.optionLabels.ownPace',
                tag: 'own_pace',
                description: 'onboarding.desiredTempo.optionDescriptions.ownPace'
            }
        ]
    },
    {
        title: 'onboarding.currentMethodes.title',
        description: 'onboarding.currentMethodes.subtitle',
        kind: OnboardingQuestionKind.MULTIPLE_TILES,
        options: [
            {
                label: 'onboarding.currentMethodes.optionLabels.chemex',
                tag: 'chemex',
                image: 'chemex.svg'
            },
            {
                label: 'onboarding.currentMethodes.optionLabels.mokaPot',
                tag: 'moka_pot',
                image: 'moka_pot.svg'
            },
            {
                label: 'onboarding.currentMethodes.optionLabels.espressoMachine',
                tag: 'espresso_machine',
                image: 'espresso_machine.svg'
            },
            {
                label: 'onboarding.currentMethodes.optionLabels.pourOver',
                tag: 'pour_over',
                image: 'pour_over.svg'
            },
            {
                label: 'onboarding.currentMethodes.optionLabels.frenchPress',
                tag: 'french_press',
                image: 'french_press.svg'
            },
            {
                label: 'onboarding.currentMethodes.optionLabels.none',
                tag: 'none',
                image: 'cross.svg'
            },
        ],
    },
    {
        title: 'onboarding.extraGear.title',
        description: 'onboarding.extraGear.subtitle',
        kind: OnboardingQuestionKind.MULTIPLE_TILES,
        options: [
            {
                label: 'onboarding.extraGear.optionLabels.precisionScale',
                tag: 'precision_scale',
                image: ''
            },
            {
                label: 'onboarding.extraGear.optionLabels.gooseneckKettle',
                tag: 'gooseneck_kettle',
                image: 'gooseneck_kettle.svg'
            },
            {
                label: 'onboarding.extraGear.optionLabels.coffeeGrinder',
                tag: 'coffee_grinder',
                image: 'bean_mil.svg'
            },
            {
                label: 'onboarding.extraGear.optionLabels.milkFrother',
                tag: 'milk_frother',
                image: 'milk_foamer.svg'
            },
            {
                label: 'onboarding.extraGear.optionLabels.none',
                tag: 'none',
                image: 'cross.svg'
            },
        ],
    },
];

export const refactorOnboardingSelection = (answers: Record<number, number[]>): IOnboardingAnswers => {
    const getSelectedTags = (questionIndex: number): string[] => {
        const optionIndices = answers[questionIndex] || [];
        if (optionIndices.length === 0) {
            return [];
        }
        const question = onboardingQuestions[questionIndex];
        return optionIndices.map(optionIndex => question.options[optionIndex].tag as string);
    };

    const getSingleChoiceTag = (questionIndex: number): string | null => {
        const tags = getSelectedTags(questionIndex);
        return tags.length > 0 ? tags[0] : null;
    }

    const getMultipleChoiceTags = (questionIndex: number): string[] => {
        const tags = getSelectedTags(questionIndex);
        if (tags.includes('none')) {
            return [];
        }
        return tags;
    }
    
    const getMultipleChoiceTagsOrNull = (questionIndex: number): string[] | null => {
        const tags = getSelectedTags(questionIndex);
        if (tags.includes('none') || tags.length === 0) {
            return null;
        }
        return tags;
    }

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