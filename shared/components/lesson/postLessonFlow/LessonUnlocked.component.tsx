import { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Easing, StyleSheet, Text, Vibration, View } from 'react-native';

// COMPONENTS
import { SvgIcon } from '@/shared/components';

// STYLES
import { baseStyles, colors, spacing } from '@/shared/styles/design.system';

// TYPES
import { ESvgIconName } from '@/shared/types/enums';
import { ILessonUnlockedProps } from '@/shared/types/types';

export const LessonUnlockedScreen: FC<ILessonUnlockedProps> = ({ lesson }) => {
    const { t } = useTranslation();

    const lName = lesson?.translations?.[0]?.name || 'Nieuwe Les';
    const lDescription = lesson?.translations?.[0]?.description || '';

    const lockOpacity = useRef(new Animated.Value(1)).current;
    const lockScale = useRef(new Animated.Value(1)).current;

    const unlockOpacity = useRef(new Animated.Value(0)).current;
    const unlockScale = useRef(new Animated.Value(0.5)).current;

    const groupTranslateY = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;
    const textTranslateY = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        const timer1 = setTimeout(() => {
            Vibration.vibrate();

            Animated.parallel([
                Animated.timing(lockOpacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(lockScale, {
                    toValue: 0.5,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(unlockOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.spring(unlockScale, {
                    toValue: 1,
                    tension: 60,
                    friction: 5,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 600);

        const timer2 = setTimeout(() => {
            Vibration.vibrate();

            Animated.parallel([
                Animated.timing(groupTranslateY, {
                    toValue: -80,
                    duration: 600,
                    easing: Easing.out(Easing.back(1.2)),
                    useNativeDriver: true,
                }),
                Animated.timing(textOpacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(textTranslateY, {
                    toValue: 0,
                    duration: 600,
                    easing: Easing.out(Easing.back(1.2)),
                    useNativeDriver: true,
                }),
            ]).start();
        }, 2000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <View style={styles.wrapper}>
            <Animated.View
                style={[styles.iconGroup, { transform: [{ translateY: groupTranslateY }] }]}
            >
                <Animated.View
                    style={[
                        styles.absoluteCenter,
                        {
                            opacity: lockOpacity,
                            transform: [{ scale: lockScale }],
                        },
                    ]}
                >
                    <SvgIcon
                        name={ESvgIconName.LOCKED}
                        width={100}
                        height={100}
                        color={colors.text.muted}
                    />
                </Animated.View>

                <Animated.View
                    style={[
                        styles.absoluteCenter,
                        {
                            opacity: unlockOpacity,
                            transform: [{ scale: unlockScale }],
                        },
                    ]}
                >
                    <SvgIcon
                        name={ESvgIconName.UNLOCKED}
                        width={100}
                        height={100}
                        color={colors.primary}
                    />
                </Animated.View>
            </Animated.View>

            <Animated.View
                style={[
                    styles.textGroup,
                    {
                        opacity: textOpacity,
                        transform: [{ translateY: textTranslateY }],
                    },
                ]}
            >
                <Text style={styles.tag}>{t('lesson.postFlow.lessonUnlocked.tag')}</Text>
                <Text style={[baseStyles.h2, styles.lessonTitle]}>{lName}</Text>
                {lDescription ? (
                    <Text style={[baseStyles.p, styles.lDescription]}>{lDescription}</Text>
                ) : null}
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
    iconGroup: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    absoluteCenter: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textGroup: {
        position: 'absolute',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: spacing.md,
        top: '55%',
        zIndex: 1,
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
    lessonTitle: {
        color: colors.text.primary,
        fontSize: 36,
        textAlign: 'center',
        lineHeight: 42,
    },
    lDescription: {
        marginTop: spacing.md,
        textAlign: 'center',
        color: colors.text.muted,
        lineHeight: 24,
    },
});
