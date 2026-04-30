import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

// COMPONENTS
import { SvgIcon } from '@/shared/components/SvgIcon.component';

// STORE
import { useOnboardingStore } from '@/shared/context/onboardingStore.context';

// STYLES
import { baseStyles, borderRadius, colors, spacing } from '@/shared/styles/design.system';

// TYPES
import { IQuestionProps } from '@/shared/types/types';

export const SingleChoiceImageQuestion: FC<IQuestionProps> = ({ options, questionIndex }) => {
    const { answers, setSingleChoiceAnswer } = useOnboardingStore();
    const { t } = useTranslation();

    const currentAnswers = answers[questionIndex] || [];

    const handleOnPress = (index: number) => {
        setSingleChoiceAnswer(questionIndex, index);
    };

    const renderOptions = () => {
        return options.map((option, index) => (
            <TouchableOpacity
                key={index}
                style={[styles.option, currentAnswers.includes(index) && { opacity: 1 }]}
                onPress={() => handleOnPress(index)}
            >
                {option.image && <SvgIcon name={option.image} width={60} />}
                <Text style={[baseStyles.h4, { flex: 1 }]}>{t(option.label)}</Text>
            </TouchableOpacity>
        ));
    };

    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
            {options && renderOptions()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        width: '100%',
    },
    contentContainer: {
        gap: spacing.lg,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.lg,
        minHeight: 90,

        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: borderRadius.md,

        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,

        opacity: 0.4,
    },
});
