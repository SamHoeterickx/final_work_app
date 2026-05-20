import { FC } from "react"

// COMPONENTS
import { DidYouKnowScreen } from "./conentScreens/DidYouKnowScreen.component"
import { OnlyTextScreen } from "./conentScreens/OnlyTextScreen.component"
import { TextWithImageScreen } from './conentScreens/TextWithImageScreen.component'
import { TitleScreen } from "./conentScreens/TitleScreen.component"

// TYPES
import { ELessonScreenOptions } from "@/shared/types/enums"
import { ILessonScreenOptionsWrapperProps } from "@/shared/types/types"

export const LessonScreenOptionsWrapper: FC<ILessonScreenOptionsWrapperProps> = ({ screenType, lessonContent, subStep }) => {

    switch(screenType) {
        case ELessonScreenOptions.C_TITLE:
            return <TitleScreen content={lessonContent} />;
        case ELessonScreenOptions.C_DID_YOU_KNOW:
            return <DidYouKnowScreen content={lessonContent} />;
        case ELessonScreenOptions.C_TEXT_WITH_IMAGE:
            return <TextWithImageScreen  content={lessonContent} subStep={subStep}/>;
        case ELessonScreenOptions.C_ONLY_TEXT:
            return <OnlyTextScreen />;
        default:
            return null;
    }
}