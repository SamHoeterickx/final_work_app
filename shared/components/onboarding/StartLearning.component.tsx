import { useRouter } from 'expo-router';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// COMPONENTS
import { Button } from '../index';
import { LessonUnlockedScreen } from '../lesson/postLessonFlow/LessonUnlocked.component';

// CONTEXT
import { useAuthStore } from '@/shared/context/authStore.context';

export const StartLearning: FC = () => {
    const roadmapResponse = useAuthStore((state) => state.roadmapResponse);
    const setNeedsRoadmap = useAuthStore((state) => state.setNeedsRoadmap);

    const { i18n } = useTranslation();
    const router = useRouter();

    const firstLesson = roadmapResponse?.lessons?.[0];

    const handleStartLesson = () => {
        setNeedsRoadmap(false);
        router.replace(`/(app)/lesson/${firstLesson?.uuid}`);
    };

    const translation =
        firstLesson?.translations.find(
            (translation) => translation.languageCode === i18n.language,
        ) || firstLesson?.translations[0];

    console.log('translation', translation);

    console.log(firstLesson);

    return (
        <>
            <LessonUnlockedScreen
                lesson={{
                    status: 'UNLOCKED',
                    uuid: firstLesson?.uuid || '',
                    translations: translation!,
                }}
            />

            <Button copy="postOnboardingFlow.start.buttons.start" onPress={handleStartLesson} />
        </>
    );
};
