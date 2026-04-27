import { FC } from "react";
import { IOnboardingQuestionWrapperProps, OnboardingQuestionKind } from "../../types/types";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion.component";
import { MultipleChoiceTilesQuestion } from "./MultipleChoiceTilesQuestion.component";
import { MultipleChoiceTitleQuestion } from "./MultipleChoiceTitleQuestion.component";
import { SingleChoiceQuestion } from "./SingleChoiceQuestion.component";

export const OnboardingQuestionWrapper: FC<IOnboardingQuestionWrapperProps> = ({ kind }) => {
    switch (kind) {
        case OnboardingQuestionKind.MULTIPLE_CHOICE:
            return <MultipleChoiceQuestion />;
        case OnboardingQuestionKind.MULTIPLE_CHOICE_TITLE:
            return <MultipleChoiceTitleQuestion />;
        case OnboardingQuestionKind.MULTIPLE_TILES:
            return <MultipleChoiceTilesQuestion />;
        case OnboardingQuestionKind.SINGLE_CHOICE:
            return <SingleChoiceQuestion />;
        default:
            return null;
    }
}