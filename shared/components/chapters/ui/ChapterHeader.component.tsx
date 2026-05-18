import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// COMPONENTS
import { ChapterProgress } from './ChapterProgress.component';
import { LessonStatus } from './LessonStatus.component';
import { LockedStatus } from './LockedStatus.component';

// STYLES
import { baseStyles } from '@/shared/styles/design.system';

// TYPES
import { EProgressStatus } from '@/shared/types/enums';
import { IChapterHeaderProps } from '@/shared/types/types';

export const ChapterHeader: FC<IChapterHeaderProps> = ({
    chapterUser,
    isFocused,
    selectedLesson,
}) => {
    const renderStatus = () => {
        if (isFocused && selectedLesson) return <LessonStatus lesson={selectedLesson} />;
        if (chapterUser.status === EProgressStatus.LOCKED) return <LockedStatus />;

        return <ChapterProgress lessons={chapterUser.chapter.lessons} />;
    };

    const renderTitle = () => {
        if (!selectedLesson) {
            return (
                <Text style={[baseStyles.h2, styles.chapterTitle]}>{chapterUser.chapter.name}</Text>
            );
        }

        if (isFocused && selectedLesson) {
            return <Text style={[baseStyles.h3, styles.lessonTitle]}>{selectedLesson?.name}</Text>;
        }
    };

    return (
        <>
            <View style={styles.cTitle}>
                {renderTitle()}
                {renderStatus()}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    chapterTitle: {
        fontSize: 48,
        textAlign: 'center',
    },
    lessonTitle: {
        fontSize: 36,
        textAlign: 'center',
    },
    cTitle: {
        marginHorizontal: '5%',
    },
});
