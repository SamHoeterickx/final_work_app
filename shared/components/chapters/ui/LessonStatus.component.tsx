import { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

// STYLES
import { baseStyles } from '@/shared/styles/design.system';

// TYPES
import { ILessonStatusProps } from '@/shared/types/types';
import { EProgressStatus } from '@/shared/types/enums';

export const LessonStatus: FC<ILessonStatusProps> = ({ lesson }) => {

    const { t } = useTranslation();

    return <Text style={[baseStyles.h3, styles.status]}>{lesson.status === EProgressStatus.INPROGRESS ? t('chapter.currentStatus') : lesson.status}</Text>;
};

const styles = StyleSheet.create({
    status: {
        fontSize: 24,
        textAlign: 'center',
    },
});
