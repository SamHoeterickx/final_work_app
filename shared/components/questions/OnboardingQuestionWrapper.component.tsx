import { FC } from 'react';

// COMPONENTS
import { MultipleChoiceTilesQuestion } from './MultipleChoiceTilesQuestion.component';
import { SingleChoiceImageQuestion } from './SingleChoiceImageQuestion.component';
import { SingleChoiceQuestion } from './SingleChoiceQuestion.component';
import { SingleChoiceTitleQuestion } from './SingleChoiceTitleQuestion.component';

// TYPES
import { EOnboardingQuestionKind } from '@/shared/types/enums';
import { IOnboardingQuestionWrapperProps } from '@/shared/types/types';

export const OnboardingQuestionWrapper: FC<IOnboardingQuestionWrapperProps> = ({
    kind,
    options,
}) => {
    switch (kind) {
        case EOnboardingQuestionKind.SINGLE_CHOICE_IMG:
            return <SingleChoiceImageQuestion options={options} />;
        case EOnboardingQuestionKind.SINGLE_CHOICE_TITLE:
            return <SingleChoiceTitleQuestion options={options} />;
        case EOnboardingQuestionKind.MULTIPLE_TILES:
            return <MultipleChoiceTilesQuestion options={options} />;
        case EOnboardingQuestionKind.SINGLE_CHOICE:
            return <SingleChoiceQuestion options={options} />;
        default:
            return null;
    }
};
