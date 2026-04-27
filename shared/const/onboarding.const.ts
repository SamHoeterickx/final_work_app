import { IOnboardingQuestions, OnboardingQuestionKind } from "../types/types";

export const onboardingQuestions: IOnboardingQuestions[] = [
    {
        title: 'Hoe zet je momenteel koffie?',
        description: 'Kies de manieren waarop jij koffie drinkt.',
        kind: OnboardingQuestionKind.MULTIPLE_CHOICE_TITLE,
        options: {
            1: {
                label: 'Oploskoffie',
                image: '@/assets/icons/machines/filter_coffee.svg'
            },
            2: {
                label: 'Op het werk',
                image: '@/assets/icons/machines/full_automatic_machine.svg'

            },
            3: {
                label: 'Espresso',
                image: '@/assets/icons/machines/espresso_machine.svg'

            },
            4: {
                label: 'Cup machine',
                image: '@/assets/icons/machines/cup_machine.svg'

            },
            5: {
                label: 'French press',
                image: '@/assets/icons/machines/french_press.svg'

            },
            6: {
                label: 'Coffee shop',
                image: '@/assets/icons/machines/coffee_shop.svg'

            },
        }
    },
    {
        title: 'Wat is jouw koffie ervaring?',
        description: 'We passen je leertraject aan op basis van wat je al weet.',
        kind: OnboardingQuestionKind.SINGLE_CHOICE,
        options: {
            1: {
                label: 'De Smaakgenieter',
                description: 'Ik drink koffie vooral voor de gezelligheid.',
                image: '@/assets/icons/beans/1_bean.svg'
            },
            2: {
                label: 'De Nieuwsgierige',
                description: 'Ik heb termen als maalgraad of branding wel eens gehoord',
                image: '@/assets/icons/beans/2_beans.svg'
            },
            3: {
                label: 'De Kenner',
                description: 'Een Arabica / Robusto is niet nieuws voor mij',
                image: '@/assets/icons/beans/3_beans.svg'
            },
            4: {
                label: 'De Smaakmaker',
                description: '',
                image: '@/assets/icons/beans/4_beans.svg'
            }
        }
    }
]