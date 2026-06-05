import { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, StyleSheet, Text } from 'react-native';

// COMPONENTS
import { SvgIcon } from '../svgIcon/SvgIcon.component';

// CONTEXT
import { useHomeStore } from '@/shared/context/homeStore.context';

// STYLES
import { colors, spacing } from '@/shared/styles/design.system';

// TYPES
import { ESvgIconName } from '@/shared/types/enums';

export const SwipeIndicator: FC = () => {
    const isScreenActive = useHomeStore((state) => state.isScreenActive);
    const setIsScreenActive = useHomeStore((state) => state.setIsScreenActive);

    const { t } = useTranslation();

    const opacityAnim = useRef(new Animated.Value(0)).current;
    const translateXAnim = useRef(new Animated.Value(-20)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.delay(4000),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.delay(1000),
            ]),
        );

        const swipeAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(translateXAnim, {
                    toValue: 20,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(translateXAnim, {
                    toValue: -20,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ]),
        );

        animation.start();
        swipeAnimation.start();

        setTimeout(() => {
            setIsScreenActive(true);
        }, 5000);

        return () => {
            animation.stop();
            swipeAnimation.stop();
        };
    }, [opacityAnim, translateXAnim]);

    if (isScreenActive) return null;

    return (
        <Animated.View style={[styles.container, { opacity: opacityAnim }]}>
            <Animated.View
                style={[styles.cIndicator, { transform: [{ translateX: translateXAnim }] }]}
            >
                <SvgIcon name={ESvgIconName.SWIPE_INDICATOR} width={30} height={30} />
            </Animated.View>
            <Text style={styles.text}>{t('homeIndicator.text')}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,

        alignItems: 'center',
        gap: spacing.sm,
    },
    cIndicator: {},
    text: {
        color: colors.text.muted,
        width: '40%',
        textAlign: 'center',
    },
});
