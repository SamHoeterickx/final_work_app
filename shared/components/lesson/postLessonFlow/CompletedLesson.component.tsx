import { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, StyleSheet, Text, Vibration, View } from 'react-native';

// CONST
import { VIBRATION_PATTERN } from '@/shared/const/settings.const';

// STYLES
import { baseStyles, colors, spacing } from '@/shared/styles/design.system';

export const CompletedLessonScreen: FC = () => {
    const { t } = useTranslation();

    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Vibration.vibrate(VIBRATION_PATTERN);

        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 60,
                friction: 5,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.wrapper}>
            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: opacityAnim,
                        transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
                    },
                ]}
            >
                <Text style={styles.tag}>{t('lesson.postFlow.completed.tag')}</Text>
                <Text style={[baseStyles.h2, styles.title]}>
                    {t('lesson.postFlow.completed.title')}
                </Text>
                <Text style={[baseStyles.p, styles.subtitle]}>
                    {t('lesson.postFlow.completed.subtitle')}
                </Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
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
        color: colors.text.primary,
        marginBottom: spacing.md,
    },
    subtitle: {
        textAlign: 'center',
        color: colors.text.muted,
        lineHeight: 24,
    },
});
