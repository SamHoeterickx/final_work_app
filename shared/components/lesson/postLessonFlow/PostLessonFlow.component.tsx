import { FC } from 'react';

// COMPONENTS
import { ChapterUnlockedScreen } from './ChapterUnlocked.component';
import { LessonUnlockedScreen } from './LessonUnlocked.component';
import { StreaksFlowScreen } from './SteaksFlow.component';
import { XpFlowScreens } from './XpFlow.component';

// TYPES
import { EPostLessonFlowOptions } from '@/shared/types/enums';
import { IPostLessonFlowProps } from '@/shared/types/types';

export const PostLessonFlow: FC<IPostLessonFlowProps> = ({ data, currentStep }) => {
    switch (currentStep) {
        case EPostLessonFlowOptions.SHOW_XP:
            return <XpFlowScreens newUserXP={data.newUserXP} prevUserXP={data.prevUserXP} />;
        case EPostLessonFlowOptions.SHOW_STREAK:
            return <StreaksFlowScreen newStreak={data.newStreak} />;
        case EPostLessonFlowOptions.SHOW_UNLOCKED_LESSON:
            return <LessonUnlockedScreen lesson={data.newUnlockedLesson} />;
        case EPostLessonFlowOptions.SHOW_UNLOCKED_CHAPTER:
            return <ChapterUnlockedScreen chapter={data.newUnlockedChapter} />;
        default:
            return null;
    }
};
