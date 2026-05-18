import { useRouter } from 'expo-router';
import { FC, useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

// COMPONENTS
import { ChapterActions } from './ui/ChapterActions.component';
import { ChapterHeader } from './ui/ChapterHeader.component';
import { ChapterScene } from './ui/ChapterScene.component';

// TYPES
import { EProgressStatus } from '@/shared/types/enums';
import { IChapterProps, ILessonsChapter } from '@/shared/types/types';

// CONST
import { CAMERA_HEIGHT, CAMERA_RADIUS, LESSON_RADIUS } from '@/shared/const/chapter.const';

export const Chapter: FC<IChapterProps & { slideAnim?: Animated.Value }> = ({
    chapterUser,
    slideAnim,
    isFocused,
    setIsFocused,
}) => {
    const [cameraTarget, setCameraTarget] = useState<[number, number, number]>([0, 0.5, 0]);
    const [cameraPos, setCameraPos] = useState<[number, number, number]>([-2, 2.5, 5]);
    const [selectedLesson, setSelectedLesson] = useState<ILessonsChapter | null>(null);

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

            console.log('---LESSON');
            router.navigate(`/(app)/lesson/${selectedLesson.uuid}`);
        }
    };

    const handleButtonChapter = () => {
        const activeIndex = chapterUser.chapter.lessons.findIndex(
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

        const angle = (index / totalLessons) * Math.PI * 2;

        const lessonX = Math.cos(angle) * LESSON_RADIUS;
        const lessonZ = Math.sin(angle) * LESSON_RADIUS;
        setCameraTarget([lessonX, 0.5, lessonZ]);

        const camX = Math.cos(angle) * CAMERA_RADIUS;
        const camZ = Math.sin(angle) * CAMERA_RADIUS;
        setCameraPos([camX, CAMERA_HEIGHT, camZ]);
        setSelectedLesson(lesson);
    };

    return (
        <>
            <ChapterHeader
                chapterUser={chapterUser}
                isFocused={isFocused}
                selectedLesson={selectedLesson}
            />

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
                />
            </Animated.View>
            <ChapterActions
                status={handlePassButtonStatus()}
                isFocused={isFocused}
                onPress={handleButton}
            />
        </>
    );
};

const styles = StyleSheet.create({
    cChapterScene: {
        flex: 1,
    },
});
