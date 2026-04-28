import { FC } from "react";
import { IOnboardingQuestionWrapperProps, OnboardingQuestionKind } from "../../types/types";
import { SingleChoiceImageQuestion } from "./SingleChoiceImageQuestion.component";
import { MultipleChoiceTilesQuestion } from "./MultipleChoiceTilesQuestion.component";
import { SingleChoiceTitleQuestion } from "./SingleChoiceTitleQuestion.component";
import { SingleChoiceQuestion } from "./SingleChoiceQuestion.component";

export const OnboardingQuestionWrapper: FC<IOnboardingQuestionWrapperProps & { questionIndex: number }> = ({ kind, options, questionIndex }) => {
    switch (kind) {
        case OnboardingQuestionKind.SINGLE_CHOICE_IMG:
            return <SingleChoiceImageQuestion options={options} questionIndex={questionIndex} />;
        case OnboardingQuestionKind.SINGLE_CHOICE_TITLE:
            return <SingleChoiceTitleQuestion options={options} questionIndex={questionIndex} />
        case OnboardingQuestionKind.MULTIPLE_TILES:
            return <MultipleChoiceTilesQuestion options={options} questionIndex={questionIndex} />;
        case OnboardingQuestionKind.SINGLE_CHOICE:
            return <SingleChoiceQuestion options={options} questionIndex={questionIndex} />;
        default:
            return null;
    }
}