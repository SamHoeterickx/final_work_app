import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
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

export default function PostOnboardingFlow() {
    const [currentStep, setCurrentStep] = useState<EFlowStep>(EFlowStep.GENERATING);

    const { setNeedsRoadmap } = useAuthStore();
    const { i18n } = useTranslation();

    const router = useRouter();

    const handleStartLesson = () => {
        setNeedsRoadmap(false);
        router.replace('/(app)/home');
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case EFlowStep.GENERATING:
                return <GeneratingRoadmap onsuccess={() => setCurrentStep(EFlowStep.SUCCESS)} />;
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
