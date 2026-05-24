import { FC, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { baseStyles, borderRadius, colors, spacing } from '@/shared/styles/design.system';
import { ILessonScreenProps } from '@/shared/types/types';
import { renderFormattedText } from '@/shared/utils/text.utils';

export const RightOrWrongQuizScreen: FC<ILessonScreenProps> = ({
    content,
    quizError,
    onAnswerSelect,
}) => {
    const { t } = useTranslation();
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const opacityAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacityAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
            Animated.timing(translateYAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
        ]).start();
    }, []);

    if (!content) return null;

    const handleSelect = (option: string) => {
        setSelectedAnswer(option);

        if (onAnswerSelect) {
            onAnswerSelect(option);
        }
    };

    const questionText = content.question || content.body;
    const options = Array.isArray(content.options) ? content.options : [];

    return (
        <View style={styles.wrapper}>
            <Animated.View
                style={[
                    styles.contentContainer,
                    { opacity: opacityAnim, transform: [{ translateY: translateYAnim }] },
                ]}
            >
                <Text style={styles.tag}>{t('lesson.quiz.tag')}</Text>

                {content.title && (
                    <Text style={[baseStyles.h2, styles.title]}>{content.title}</Text>
                )}

                {questionText && (
                    <Text style={[baseStyles.p, styles.questionText]}>
                        {renderFormattedText(questionText as string)}
                    </Text>
                )}

                {quizError && <Text style={[baseStyles.p, styles.errorText]}>{quizError}</Text>}

                <View style={styles.optionsContainer}>
                    {options.map((option: string, index: number) => {
                        const isSelected = selectedAnswer === option;
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.optionButton,
                                    isSelected && styles.optionButtonSelected,
                                ]}
                                onPress={() => handleSelect(option)}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.optionText,
                                        isSelected && styles.optionTextSelected,
                                    ]}
                                >
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: spacing.sm,
    },
    contentContainer: {
        alignItems: 'center',
        width: '100%',
        marginTop: -40,
    },
    tag: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.primary,
        letterSpacing: 3,
        textTransform: 'uppercase',
        marginBottom: spacing.md,
        textAlign: 'center',
    },
    title: {
        textAlign: 'center',
        width: '100%',
        marginBottom: spacing.lg,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    questionText: {
        textAlign: 'center',
        lineHeight: 28,
        fontSize: 18,
        color: colors.text.primary,
        marginBottom: spacing.lg,
        paddingHorizontal: spacing.md,
    },
    optionsContainer: {
        width: '100%',
        gap: spacing.md,
    },
    optionButton: {
        width: '100%',
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.xl,
        borderRadius: borderRadius.md,
        borderWidth: 2,
        borderColor: colors.primary,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionButtonSelected: {
        backgroundColor: colors.primary,
    },
    optionText: {
        fontFamily: 'Vanguard-DemiBold',
        fontSize: 16,
        lineHeight: 22,
        color: colors.primary,
        textAlign: 'center',
    },
    optionTextSelected: {
        color: colors.text.secondary,
    },
    errorText: {
        color: '#E53935',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16,
    },
});
