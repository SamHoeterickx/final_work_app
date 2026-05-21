import { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Easing, StyleSheet, Text, Vibration, View } from 'react-native';

// STYLES
import { baseStyles, colors, spacing } from '@/shared/styles/design.system';

// TYPES
import { IStreaksFlowProps } from '@/shared/types/types';

export const StreaksFlowScreen: FC<IStreaksFlowProps> = ({ newStreak }) => {
    const { t } = useTranslation();

    const earnedScaleAnim = useRef(new Animated.Value(0.5)).current;
    const earnedOpacityAnim = useRef(new Animated.Value(0)).current;
    const earnedTranslateYAnim = useRef(new Animated.Value(0)).current;

    const totalOpacityAnim = useRef(new Animated.Value(0)).current;
    const totalTranslateYAnim = useRef(new Animated.Value(40)).current;

    useEffect(() => {
        Vibration.vibrate();

        Animated.parallel([
            Animated.spring(earnedScaleAnim, {
                toValue: 1,
                tension: 60,
                friction: 5,
                useNativeDriver: true,
            }),
            Animated.timing(earnedOpacityAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            Vibration.vibrate();

            Animated.parallel([
                Animated.timing(earnedTranslateYAnim, {
                    toValue: -50,
                    duration: 500,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(earnedOpacityAnim, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),

                Animated.timing(totalTranslateYAnim, {
                    toValue: 0,
                    duration: 500,
                    easing: Easing.out(Easing.back(1.2)),
                    useNativeDriver: true,
                }),
                Animated.timing(totalOpacityAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.wrapper}>
            <Animated.View
                style={[
                    styles.absoluteCenter,
                    {
                        opacity: earnedOpacityAnim,
                        transform: [
                            { scale: earnedScaleAnim },
                            { translateY: earnedTranslateYAnim },
                        ],
                    },
                ]}
            >
                <Text style={styles.tag}>{t('lesson.postFlow.streaks.congrats')}N</Text>
                <Text style={[baseStyles.h1, styles.earnedText]}>+ 1</Text>
            </Animated.View>

            <Animated.View
                style={[
                    styles.absoluteCenter,
                    {
                        opacity: totalOpacityAnim,
                        transform: [{ translateY: totalTranslateYAnim }],
                    },
                ]}
            >
                <Text style={styles.tag}>{t('lesson.postFlow.streaks.updated')}</Text>
                <Text style={[baseStyles.h1, styles.totalText]}>
                    {newStreak} {t('lesson.postFlow.streaks.days')}
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
    },
    absoluteCenter: {
        position: 'absolute',
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
    },
    earnedText: {
        color: colors.primary,
        fontSize: 64,
    },
    totalText: {
        color: colors.text.primary,
        fontSize: 64,
    },
});
