import { useRouter } from 'expo-router';
import { FC } from 'react';

// COMPONENTS
import { Button } from '../index';
import { LessonUnlockedScreen } from '../lesson/postLessonFlow/LessonUnlocked.component';

// CONTEXT
import { useAuthStore } from '@/shared/context/authStore.context';

export const StartLearning: FC = () => {
    const roadmapResponse = useAuthStore((state) => state.roadmapResponse);
    const setNeedsRoadmap = useAuthStore((state) => state.setNeedsRoadmap);
    const router = useRouter();

    const firstLesson = roadmapResponse?.lessons?.[0];

    const handleStartLesson = () => {
        setNeedsRoadmap(false);
        router.replace(`/(app)/lesson/${firstLesson?.uuid}`);
    };

    return (
        <>
            <LessonUnlockedScreen
                lesson={{
                    status: 'UNLOCKED',
                    uuid: firstLesson?.uuid || '',
                    translations: firstLesson?.translations as any,
                }}
            />

            <Button copy="postOnboardingFlow.start.buttons.start" onPress={handleStartLesson} />
        </>
    );
};
