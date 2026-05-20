import { baseStyles, spacing } from '@/shared/styles/design.system';
import { renderFormattedText } from '@/shared/utils/text.utils';
import { FC, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

export const AnimatedTextItem: FC<{ text: string; isActive: boolean }> = ({ text, isActive }) => {
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(20)).current;
    const focusAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    useEffect(() => {
        Animated.timing(focusAnim, {
            toValue: isActive ? 1 : 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [isActive]);

    const scale = focusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.94, 1],
    });

    const activeOpacity = focusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.35, 1],
    });

    return (
        <Animated.View
            style={[
                styles.textBlockWrapper,
                {
                    opacity: opacityAnim,
                    transform: [{ translateY: translateYAnim }, { scale: scale }],
                },
            ]}
        >
            <Animated.View style={{ opacity: activeOpacity }}>
                <Text style={[baseStyles.p, styles.bodyText]}>{renderFormattedText(text)}</Text>
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    textBlockWrapper: {
        width: '100%',
        marginBottom: spacing.lg,
    },
    bodyText: {
        textAlign: 'left',
        lineHeight: 28,
        fontSize: 16,
        color: '#1A1A1A',
    },
});
