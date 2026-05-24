import { useAuthStore } from "@/shared/context/authStore.context";
import { FC } from "react";
import { ChapterUnlockedScreen } from "../lesson/postLessonFlow/ChapterUnlocked.component";
import { Button } from "../buttons/Button.component";
import { IPostOnboardingFlowProps } from "@/shared/types/types";

export const ChapterUnlockedOnboardingWrapper: FC<IPostOnboardingFlowProps> = ({ handleNext }) => {

    const { roadmapResponse } = useAuthStore();

    
    return (
        <>
            <ChapterUnlockedScreen 
                chapter={roadmapResponse}
            />
            <Button
                copy="postOnboardingFlow.chapterUnlocked.buttons.continue"
                onPress={handleNext}
            />
        </>
    )
}