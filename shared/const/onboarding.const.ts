import { IOnboardingQuestions, OnboardingQuestionKind } from "../types/types";

export const onboardingQuestions: IOnboardingQuestions[] = [
    {
        title: 'Hoe zet je momenteel koffie?',
        description: 'Kies de manieren waarop jij koffie drinkt.',
        kind: OnboardingQuestionKind.MULTIPLE_TILES,
        options: [
            {
                label: 'Oploskoffie',
                image: 'filter_coffee.svg'
            },
            {
                label: 'Op het werk',
                image: 'full_automatic_machine.svg'

            },
            {
                label: 'Espresso',
                image: 'espresso_machine.svg'

            },
            {
                label: 'Cup machine',
                image: 'cup_machine.svg'

            },
            {
                label: 'French press',
                image: 'french_press.svg'

            },
            {
                label: 'Coffee shop',
                image: 'coffee_shop.svg'

            },
        ],
    },
    {
        title: 'Wat is jouw koffie ervaring?',
        description: 'We passen je leertraject aan op basis van wat je al weet.',
        kind: OnboardingQuestionKind.SINGLE_CHOICE_IMG,
        options: [
            {
                label: 'De Smaakgenieter',
                description: 'Ik drink koffie vooral voor de gezelligheid.',
                image: '1_bean.svg'
            },
            {
                label: 'De Nieuwsgierige',
                description: 'Ik heb termen als maalgraad of branding wel eens gehoord',
                image: '2_beans.svg'
            },
            {
                label: 'De Kenner',
                description: 'Een Arabica / Robusto is niet nieuws voor mij',
                image: '3_beans.svg'
            },
            {
                label: 'De Smaakmaker',
                description: 'Ik experimenteer met zetmethodes',
                image: '4_beans.svg'
            }
        ]
    },
    {
        title: 'Wat wil je graag bereiken? ',
        description: 'Kies je hoofddoel. Geen zorgen, we behandelen alles, maar we passen je leertraject hierop aan',
        kind: OnboardingQuestionKind.SINGLE_CHOICE,
        options: [
            {
                label: 'Ik wil smaken leren herkennen en omschrijven',
            },
            {
                label: 'Ik wil de perfecte espresso leren maken',
            },
            {
                label: 'Ik wil de focus leggen op melktextuur en prachtige figuren maken.',
            },
            {
                label: 'Ik wil het hele proces leren, van de plantage tot in het kopje.',
            }
        ]
    },
    {
        title: 'Wat voor koffiedrinker ben jij? ',
        description: 'Houd je van een stevige klassieker of zoek je liever de fruitige smaken op?',
        kind: OnboardingQuestionKind.SINGLE_CHOICE,
        options: [
            {
                label: 'Ik houd van een krachtige, volle smaak met tonen',
            },
            {
                label: 'Voor mij draait het om de balans tussen zachte koffie en perfecte melk.',
            },
            {
                label: 'Ik wil alles leren: van aards en kruidig tot bloemig en fris',
            },
            {
                label: 'Ik zoek naar lichte, frisse en fruitige smaken met een beetje aciditeit.',
            }
        ]
    },
    {
        title: 'Wat is jouw tempo?',
        description: 'Hoe en hoeveel tijd wil je dagelijks besteden aan je koffiereis?',
        kind: OnboardingQuestionKind.SINGLE_CHOICE_TITLE,
        options: [
            {
                label: 'De snelle shot',
                description: 'Snel en krachtig, leer me de belangrijkste zaken.'
            },
            {
                label: 'De dagelijkse routine',
                description: 'Ik neem de tijd voor een korte les tijdens het drinken van mijn koffie.'
            },
            {
                label: 'De weekend liefhebber',
                description: 'In het weekend duik ik graag in de leerstof.'
            },
            {
                label: 'Op eigen tempo',
                description: 'Geen vaste tijd, ik doe het liever op mijn eigen tempo.'
            }
        ]
    },
    {
        title: 'Welke zetmethodes heb je al?',
        description: 'Selecteer de methodeswaar je materiaal voor hebt.',
        kind: OnboardingQuestionKind.MULTIPLE_TILES,
        options: [
            {
                label: 'Chemex',
                image: 'chemex.svg'
            },
            {
                label: 'Moka pot',
                image: 'moka_pot.svg'

            },
            {
                label: 'Espresso',
                image: 'espresso_machine.svg'

            },
            {
                label: 'Pour over',
                image: 'pour_over.svg'

            },
            {
                label: 'French press',
                image: 'french_press.svg'

            },
            {
                label: 'Heb nog niets',
                image: 'cross.svg'
            },
        ],
    },
    {
        title: 'Wat staat er nog in je keuken?',
        description: 'Selecteer de extra gear dat je al hebt.',
        kind: OnboardingQuestionKind.MULTIPLE_TILES,
        options: [
            {
                label: 'Precisie weegschaal',
                image: ''
            },
            {
                label: 'Goosneck Kettle',
                image: 'gooseneck_kettle.svg'

            },
            {
                label: 'Bonenmaler',
                image: 'bean_mil.svg'

            },
            {
                label: 'Melk opschuimer',
                image: 'milk_foamer.svg'

            },
            {
                label: 'Heb nog niets',
                image: 'cross.svg'
            },
        ],
    },
]