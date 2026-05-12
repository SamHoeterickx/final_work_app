import { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

// STYLES
import { baseStyles } from '@/shared/styles/design.system';

// TYPES
import { ILessonStatusProps } from '@/shared/types/types';

export const LessonStatus: FC<ILessonStatusProps> = ({ lesson }) => {
    return <Text style={[baseStyles.h3, styles.status]}>{lesson.status}</Text>;
};

const styles = StyleSheet.create({
    status: {
        fontSize: 24,
        textAlign: 'center',
    },
});
