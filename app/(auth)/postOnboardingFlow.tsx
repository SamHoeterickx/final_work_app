import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// COMPONENTS
import { ChapterUnlocked, GeneratingRoadmap, GeneratingSuccessfull, StartLearning } from "@/shared/components";

// TYPES
import { EFlowStep } from "@/shared/types/types";

// STYLES
import { baseStyles } from "@/shared/styles/design.system";
import { useTranslation } from "react-i18next";

const DUMMYDATA = {
    en: {
        name: 'The Journey of the Bean',
    },
    nl: {
        name: 'De Reis van de Boon',
    },
    fr: {
        name: 'Le Voyage du Grain',
    },
    path: '',
    lessons: [
        {
            en: {
                name: 'Arabica vs. Robusta'
            },
            nl: {
                name: 'Arabica vs. Robusta'
            },
            fr: {
                name: 'Arabica vs. Robusta'
            }
        }
    ]
}

export default function PostOnboardingFlow() {
    const [currentStep, setCurrentStep] = useState<EFlowStep>(EFlowStep.CHAPTER_UNLOCKED);

    const { i18n } = useTranslation();

    const router = useRouter();

    useEffect(() => {
        if(currentStep === EFlowStep.GENERATING){
            const timer = setTimeout(() => {
                setCurrentStep(EFlowStep.SUCCESS);
            }, 5000);

            return () => clearTimeout(timer);
        }
    },[currentStep]);

    const handleStartLesson = () => {
        router.replace('/(app)/home')
    }


    const renderCurrentStep = () => {
        switch(currentStep) {
            case EFlowStep.GENERATING : 
                return <GeneratingRoadmap />
            case EFlowStep.SUCCESS : 
                return <GeneratingSuccessfull handleNext={() => setCurrentStep(EFlowStep.CHAPTER_UNLOCKED)} />
            case EFlowStep.CHAPTER_UNLOCKED : 
                return <ChapterUnlocked chapter={(DUMMYDATA as any)[i18n.language].name} islandPath={DUMMYDATA.path} handleNext={() => setCurrentStep(EFlowStep.START_LEARNING)} />
            case EFlowStep.START_LEARNING : 
                return <StartLearning name={(DUMMYDATA as any)[i18n.language].lessons[0].name} handleNext={handleStartLesson} />
            default: 
                return null
        }
    }

    return (
        <SafeAreaView style={[baseStyles.container]}>
            { renderCurrentStep() }
        </SafeAreaView>
    )
}
