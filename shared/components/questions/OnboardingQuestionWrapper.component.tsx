import { FC } from 'react';

// COMPONENTS
import { MultipleChoiceTilesQuestion } from './MultipleChoiceTilesQuestion.component';
import { SingleChoiceImageQuestion } from './SingleChoiceImageQuestion.component';
import { SingleChoiceQuestion } from './SingleChoiceQuestion.component';
import { SingleChoiceTitleQuestion } from './SingleChoiceTitleQuestion.component';

// TYPES
import { IOnboardingQuestionWrapperProps } from '@/shared/types/types';
import { EOnboardingQuestionKind } from '@/shared/types/enums';

export const OnboardingQuestionWrapper: FC<
    IOnboardingQuestionWrapperProps & { questionIndex: number }
> = ({ kind, options, questionIndex }) => {
    switch (kind) {
        case EOnboardingQuestionKind.SINGLE_CHOICE_IMG:
            return <SingleChoiceImageQuestion options={options} questionIndex={questionIndex} />;
        case EOnboardingQuestionKind.SINGLE_CHOICE_TITLE:
            return <SingleChoiceTitleQuestion options={options} questionIndex={questionIndex} />;
        case EOnboardingQuestionKind.MULTIPLE_TILES:
            return <MultipleChoiceTilesQuestion options={options} questionIndex={questionIndex} />;
        case EOnboardingQuestionKind.SINGLE_CHOICE:
            return <SingleChoiceQuestion options={options} questionIndex={questionIndex} />;
        default:
            return null;
    }
};
