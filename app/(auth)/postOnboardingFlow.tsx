import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

// COMPONENTS
import {
    ChapterUnlocked,
    GeneratingRoadmap,
    GeneratingSuccessfull,
    StartLearning,
} from '@/shared/components';

// TYPES
import { EFlowStep } from '@/shared/types/enums';

// STORE
import { useAuthStore } from '@/shared/context/authStore.context';

// STYLES
import { baseStyles } from '@/shared/styles/design.system';

const DUMMYDATA = {
    en: {
        name: 'Moka Pot',
    },
    nl: {
        name: 'Moka Pot',
    },
    fr: {
        name: 'Moka Pot',
    },
    path: '',
    lessons: [
        {
            en: {
                name: 'The Moka Pot Basics',
                description: 'Learn how the Moka Pot brews coffee using steam pressure.',
            },
            nl: {
                name: 'De Basis van de Moka Pot',
                description: 'Leer hoe de Moka Pot koffie zet met behulp van stoomdruk.',
            },
            fr: {
                name: 'Les Bases de la Cafetière Moka',
                description:
                    'Découvrez comment la cafetière Moka prépare le café en utilisant la pression de la vapeur.',
            },
        },
        {
            en: {
                name: 'Brewing the Perfect Cup',
                description:
                    'Step-by-step guide to avoiding bitterness and getting a rich espresso-like shot.',
            },
            nl: {
                name: 'Het Perfecte Kopje Zetten',
                description:
                    'Stap-voor-stap gids om bitterheid te voorkomen en een rijke, espresso-achtige shot te krijgen.',
            },
            fr: {
                name: 'Préparer la Tasse Parfaite',
                description:
                    "Guide étape par étape pour éviter l'amertume et obtenir un shot riche façon espresso.",
            },
        },
    ],
};

export default function PostOnboardingFlow() {
    const [currentStep, setCurrentStep] = useState<EFlowStep>(EFlowStep.GENERATING);

    const { setNeedsRoadmap } = useAuthStore();
    const { i18n } = useTranslation();

    const router = useRouter();

    useEffect(() => {
        if (currentStep === EFlowStep.GENERATING) {
            const timer = setTimeout(() => {
                setCurrentStep(EFlowStep.SUCCESS);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [currentStep]);

    const handleStartLesson = () => {
        setNeedsRoadmap(false);
        router.replace('/(app)/home');
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case EFlowStep.GENERATING:
                return <GeneratingRoadmap />;
            case EFlowStep.SUCCESS:
                return (
                    <GeneratingSuccessfull
                        handleNext={() => setCurrentStep(EFlowStep.CHAPTER_UNLOCKED)}
                    />
                );
            case EFlowStep.CHAPTER_UNLOCKED:
                return (
                    <ChapterUnlocked
                        chapter={(DUMMYDATA as any)[i18n.language].name}
                        islandPath={DUMMYDATA.path}
                        handleNext={() => setCurrentStep(EFlowStep.START_LEARNING)}
                    />
                );
            case EFlowStep.START_LEARNING:
                return (
                    <StartLearning
                        name={(DUMMYDATA as any).lessons[0][i18n.language].name}
                        description={(DUMMYDATA as any).lessons[0][i18n.language].description}
                        handleNext={handleStartLesson}
                    />
                );
            default:
                return null;
        }
    };

    return <SafeAreaView style={[baseStyles.container]}>{renderCurrentStep()}</SafeAreaView>;
}
