import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// COMPONENTS
import { ChapterProgress } from './ChapterProgress.component';
import { LessonStatus } from './LessonStatus.component';
import { LockedStatus } from './LockedStatus.component';

// STYLES
import { baseStyles, spacing } from '@/shared/styles/design.system';

// TYPES
import { ELocales, EProgressStatus } from '@/shared/types/enums';
import { IChapterHeaderProps } from '@/shared/types/types';
import { useTranslation } from 'react-i18next';

export const ChapterHeader: FC<IChapterHeaderProps> = ({
    chapterUser,
    isFocused,
    selectedLesson,
}) => {
    const { i18n } = useTranslation();

    const renderStatus = () => {
        if (isFocused && selectedLesson) return <LessonStatus lesson={selectedLesson} />;
        if (chapterUser.status === EProgressStatus.LOCKED) return <LockedStatus />;

        return <ChapterProgress lessons={chapterUser.chapter.lessons} />;
    };

    console.log(chapterUser);

    const renderTitle = () => {
        if (!selectedLesson) {
            return (
                <Text style={[baseStyles.h2, styles.chapterTitle]}>
                    {chapterUser.chapter.name[i18n.language as ELocales] ||
                        chapterUser.chapter.name.en}
                </Text>
            );
        }

        if (isFocused && selectedLesson) {
            console.log('selectedLesson', selectedLesson);
            return (
                <Text style={[baseStyles.h3, styles.lessonTitle]}>
                    {selectedLesson.translations[0].name}
                </Text>
            );
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
        marginTop: spacing.lg,
    },
    lessonTitle: {
        fontSize: 36,
        textAlign: 'center',
    },
    cTitle: {
        marginHorizontal: '5%',
    },
});
