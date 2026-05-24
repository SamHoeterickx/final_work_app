import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

// COMPONENTS
import {
    ChapterUnlockedOnboardingWrapper,
    GeneratingRoadmap,
    GeneratingSuccessfull,
    StartLearning,
} from '@/shared/components';

// TYPES
import { EFlowStep } from '@/shared/types/enums';

// STYLES
import { baseStyles } from '@/shared/styles/design.system';

export default function PostOnboardingFlow() {
    const [currentStep, setCurrentStep] = useState<EFlowStep>(EFlowStep.GENERATING);

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
                    <ChapterUnlockedOnboardingWrapper
                        handleNext={() => setCurrentStep(EFlowStep.START_LEARNING)}
                    />
                );
            case EFlowStep.START_LEARNING:
                return <StartLearning />;
            default:
                return null;
        }
    };

    return <SafeAreaView style={[baseStyles.container]}>{renderCurrentStep()}</SafeAreaView>;
}
