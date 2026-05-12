import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// COMPONENTS

// STYLES
import { baseStyles } from '@/shared/styles/design.system';

// TYPES
import { EProgressStatus } from '@/shared/types/enums';
import { IChapterHeaderProps } from '@/shared/types/types';
import { ChapterProgress } from './ChapterProgress.component';
import { LessonStatus } from './LessonStatus.component';
import { LockedStatus } from './LockedStatus.component';
import { BackButton } from '../../buttons/BackButton.component';

export const ChapterHeader: FC<IChapterHeaderProps> = ({
    chapterUser,
    isFocused,
    selectedLesson,
    setIsFocused,
}) => {
    const renderStatus = () => {
        if (isFocused && selectedLesson) return <LessonStatus lesson={selectedLesson} />;
        if (chapterUser.status === EProgressStatus.LOCKED) return <LockedStatus />;

        return <ChapterProgress lessons={chapterUser.chapter.lessons} />;
    };

    const renderTitle = () => {
        if (!isFocused) return chapterUser.chapter.name;

        if (isFocused) {
            return selectedLesson?.name;
        }
    };

    return (
        <>
            <View style={styles.cTitle}>
                <Text style={[baseStyles.h2, styles.chapterTitle]}>{renderTitle()}</Text>
                {renderStatus()}
            </View>
            {isFocused && <BackButton isFocused={isFocused} setIsFocused={setIsFocused} />}
        </>
    );
};

const styles = StyleSheet.create({
    chapterTitle: {
        fontSize: 48,
        textAlign: 'center',
    },
    cTitle: {
        marginHorizontal: '5%',
    },
});
