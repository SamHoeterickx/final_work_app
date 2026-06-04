import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGLTF as loadGLTF, useGLTF } from '@react-three/drei/native';

// COMPONENTS
import {
    ChapterUnlockedOnboardingWrapper,
    GeneratingRoadmap,
    GeneratingSuccessfull,
    StartLearning,
} from '@/shared/components';
import { modelAssets } from '@/shared/components/modelLoader/FloatingIsland.component';

// TYPES
import { EFlowStep } from '@/shared/types/enums';
import { IGenerateCustomRoadmapResponse } from '@/shared/types/response.type';

// STYLES
import { baseStyles } from '@/shared/styles/design.system';

// UTILS & STORE
import { useAuthStore } from '@/shared/context/authStore.context';

export default function PostOnboardingFlow() {
    const [currentStep, setCurrentStep] = useState<EFlowStep>(EFlowStep.GENERATING);

    const handleRoadmapGenerated = async () => {
        const response = useAuthStore.getState().roadmapResponse;
        const slug = (response as IGenerateCustomRoadmapResponse)?.slug;

        const asset =
            (slug && modelAssets[slug as keyof typeof modelAssets]) || modelAssets.coffee_cup;

        useGLTF.preload(asset);

        await new Promise<void>((resolve) => {
            const interval = setInterval(() => {
                try {
                    loadGLTF(asset);
                    clearInterval(interval);
                    resolve();
                } catch {}
            }, 100);
        });

        setCurrentStep(EFlowStep.SUCCESS);
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case EFlowStep.GENERATING:
                return <GeneratingRoadmap onsuccess={handleRoadmapGenerated} />;
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
