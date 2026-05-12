import { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

// STYLES
import { baseStyles } from '@/shared/styles/design.system';

// TYPES
import { EProgressStatus } from '@/shared/types/enums';
import { IChapterProgressProps } from '@/shared/types/types';

export const ChapterProgress: FC<IChapterProgressProps> = ({ lessons }) => {
    const allLessons = lessons || [];

    const completed = allLessons.filter((lesson) => lesson.status !== EProgressStatus.LOCKED);

    return (
        <Text
            style={[baseStyles.h3, styles.status]}
        >{`${completed.length} / ${allLessons.length}`}</Text>
    );
};

const styles = StyleSheet.create({
    status: {
        fontSize: 24,
        textAlign: 'center',
    },
});
