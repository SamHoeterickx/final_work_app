import { useRouter } from 'expo-router';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, StyleSheet, View } from 'react-native';

// COMPONENTS
import { ChapterActions } from './ui/ChapterActions.component';
import { ChapterHeader } from './ui/ChapterHeader.component';
import { ChapterScene } from './ui/ChapterScene.component';

// TYPES
import { EIslandModels, EProgressStatus } from '@/shared/types/enums';
import { IChapterProps, ILessonsChapter, ILessonTranslations } from '@/shared/types/types';

// CONST
import { CAMERA_HEIGHT, CAMERA_RADIUS, LESSON_RADIUS } from '@/shared/const/chapter.const';

// STYLES
import { spacing } from '@/shared/styles/design.system';

export const Chapter: FC<IChapterProps & { slideAnim?: Animated.Value }> = ({
    chapterUser,
    slideAnim,
    isFocused,
    setIsFocused,
}) => {
    const [cameraTarget, setCameraTarget] = useState<[number, number, number]>([0, 0.5, 0]);
    const [cameraPos, setCameraPos] = useState<[number, number, number]>([-2, 2.5, 5]);
    const [selectedLesson, setSelectedLesson] = useState<ILessonsChapter | null>(null);

    const { i18n } = useTranslation();
    const router = useRouter();

    useEffect(() => {
        if (!isFocused) {
            setCameraPos([-2, CAMERA_HEIGHT, 5]);
            setCameraTarget([0, 0.5, 0]);
            setSelectedLesson(null);
        }
    }, [isFocused]);

    const handleButton = () => {
        console.log('pressed');

        if (!isFocused) {
            handleButtonChapter();
        } else {
            if (!selectedLesson) return;
            router.navigate(`/(app)/lesson/${selectedLesson.uuid}`);
        }
    };

    const handleButtonChapter = () => {
        const allCompleted = chapterUser.chapter.lessons.every(
            (lesson: ILessonsChapter) => lesson.status === EProgressStatus.COMPLETED,
        );

        const activeIndex = allCompleted
            ? 0
            : chapterUser.chapter.lessons.findIndex(
                  (lesson) =>
                      lesson.status === EProgressStatus.INPROGRESS ||
                      lesson.status === EProgressStatus.UNLOCKED,
              );

        if (activeIndex !== -1) {
            handleLessonClick(activeIndex, chapterUser.chapter.lessons[activeIndex]);
        } else {
            setCameraPos([0, CAMERA_HEIGHT, 1.5]);
            setCameraTarget([0, 0.5, 0]);
        }
        setIsFocused(true);
    };

    const handlePassButtonStatus = (): EProgressStatus => {
        if (!isFocused) {
            return chapterUser.status;
        } else {
            return selectedLesson?.status ?? EProgressStatus.INPROGRESS;
        }
    };

    const handleLessonClick = (index: number, lesson: ILessonsChapter) => {
        const totalLessons = chapterUser.chapter.lessons.length;

        const angle = -(index / totalLessons) * Math.PI * 2;

        const lessonX = Math.cos(angle) * LESSON_RADIUS;
        const lessonZ = Math.sin(angle) * LESSON_RADIUS;
        setCameraTarget([lessonX, 0.5, lessonZ]);

        const camX = Math.cos(angle) * CAMERA_RADIUS;
        const camZ = Math.sin(angle) * CAMERA_RADIUS;
        setCameraPos([camX, CAMERA_HEIGHT, camZ]);

        const lessonn = {
            uuid: lesson.uuid,
            status: lesson.status,
            order: lesson.order,
            translations: (Array.isArray(lesson.translations) ? lesson.translations : []).filter(
                (translation: ILessonTranslations) =>
                    translation.languageCode === i18n.language.toUpperCase(),
            ) as ILessonTranslations[],
        };

        setSelectedLesson(lessonn);
    };

    return (
        <>
            <Animated.View
                style={[
                    styles.cChapterScene,
                    { transform: slideAnim ? [{ translateX: slideAnim }] : [] },
                ]}
            >
                <ChapterScene
                    isFocused={isFocused}
                    cameraPos={cameraPos}
                    cameraTarget={cameraTarget}
                    lessons={chapterUser.chapter.lessons}
                    onLessonClick={handleLessonClick}
                    modelUrl={chapterUser.chapter.slug as EIslandModels}
                />
            </Animated.View>
            <View style={styles.uiContainer} pointerEvents="box-none">
                <ChapterHeader
                    chapterUser={chapterUser}
                    isFocused={isFocused}
                    selectedLesson={selectedLesson}
                />
                <ChapterActions
                    status={handlePassButtonStatus()}
                    isFocused={isFocused}
                    onPress={handleButton}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    cChapterScene: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    uiContainer: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: spacing.xxl * 2,
        pointerEvents: 'box-none',
    },
});
