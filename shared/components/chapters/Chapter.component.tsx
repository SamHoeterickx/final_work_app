import { FC, useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

// COMPONENTS
import { ChapterActions } from './ui/ChapterActions.component';
import { ChapterHeader } from './ui/ChapterHeader.component';
import { ChapterScene } from './ui/ChapterScene.component';

// TYPES
import { EProgressStatus } from '@/shared/types/enums';
import { IChapterProps, ILessonsChapter } from '@/shared/types/types';

export const Chapter: FC<IChapterProps & { slideAnim?: Animated.Value }> = ({
    chapterUser,
    slideAnim,
    isFocused,
    setIsFocused,
}) => {
    const [cameraTarget, setCameraTarget] = useState<[number, number, number]>([0, 0.5, 0]);
    const [cameraPos, setCameraPos] = useState<[number, number, number]>([-2, 2.5, 5]);
    const [selectedLesson, setSelectedLesson] = useState<ILessonsChapter | null>(null);

    useEffect(() => {
        if (!isFocused) {
            setCameraPos([-2, 2.5, 5]);
            setCameraTarget([0, 0.5, 0]);
            setSelectedLesson(null);
        }
    }, [isFocused]);

    const handleButton = () => {
        console.log('pressed');

        const activeIndex = chapterUser.chapter.lessons.findIndex(
            (lesson) =>
                lesson.status === EProgressStatus.INPROGRESS ||
                lesson.status === EProgressStatus.UNLOCKED,
        );

        if (activeIndex !== -1) {
            handleLessonClick(activeIndex, chapterUser.chapter.lessons[activeIndex]);
        } else {
            setCameraPos([0, 2.5, 1.5]);
            setCameraTarget([0, 0.5, 0]);
        }
        setIsFocused(true);
    };

    const handleLessonClick = (index: number, lesson: ILessonsChapter) => {
        const totalLessons = chapterUser.chapter.lessons.length;
        const lessonRadius = 0.35;
        const cameraRadius = 2.25;
        const cameraHeight = 2.25;

        const angle = (index / totalLessons) * Math.PI * 2;

        const lessonX = Math.cos(angle) * lessonRadius;
        const lessonZ = Math.sin(angle) * lessonRadius;
        setCameraTarget([lessonX, 0.5, lessonZ]);

        const camX = Math.cos(angle) * cameraRadius;
        const camZ = Math.sin(angle) * cameraRadius;
        setCameraPos([camX, cameraHeight, camZ]);
        setSelectedLesson(lesson);
    };

    return (
        <>
            <ChapterHeader
                chapterUser={chapterUser}
                isFocused={isFocused}
                selectedLesson={selectedLesson}
                setIsFocused={setIsFocused}
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
                status={chapterUser.status}
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
