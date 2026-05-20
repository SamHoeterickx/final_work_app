import { baseStyles, spacing } from '@/shared/styles/design.system';
import { ILessonScreenProps } from '@/shared/types/types';
import { FC, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const AnimatedTextItem: FC<{ text: string; index: number }> = ({ text, index }) => {
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 400,
                delay: index > 0 ? 300 : 0, // Wacht tot de foto bijna weg is
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 400,
                delay: index > 0 ? 300 : 0,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    return (
        <Animated.Text style={[baseStyles.p, styles.bodyText, { opacity: opacityAnim, transform: [{ translateY: translateYAnim }] }]}>
            {text}
        </Animated.Text>
    );
};

export const TextWithImageScreen: FC<ILessonScreenProps> = ({ content, subStep = 0 }) => {
    const bodyArray = Array.isArray(content.body) ? content.body : [content.body];
    const textsToRender = bodyArray.slice(0, subStep + 1);

    const imageOpacityAnim = useRef(new Animated.Value(subStep > 0 ? 0 : 1)).current;
    const imageHeightAnim = useRef(new Animated.Value(subStep > 0 ? 0 : 250)).current;
    const imageMarginAnim = useRef(new Animated.Value(subStep > 0 ? 0 : spacing.xl)).current;

    useEffect(() => {
        if (subStep > 0) {
            Animated.parallel([
                Animated.timing(imageOpacityAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(imageHeightAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(imageMarginAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(imageOpacityAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(imageHeightAnim, {
                    toValue: 250,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(imageMarginAnim, {
                    toValue: spacing.xl,
                    duration: 300,
                    useNativeDriver: false,
                }),
            ]).start();
        }
    }, [subStep]);

    return (
        <View style={styles.wrapper}>
            { content.title && <Text style={[baseStyles.h2, styles.title]}>{content.title}</Text>}
            <View style={styles.contentContainer}>
                <Animated.Image
                    style={[styles.image, { opacity: imageOpacityAnim, height: imageHeightAnim, marginBottom: imageMarginAnim }]}
                    source={require('@/assets/images/moka_pot_1.png')}
                    resizeMode='contain'
                />
                <View>
                    {textsToRender.map((text: string, index: number) => <AnimatedTextItem key={index} text={text} index={index} />)}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    title: {
        textAlign: 'center',
        width: '100%',
        marginBottom: spacing.lg,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: '100%',
    },
    bodyText: {
        textAlign: 'left',
        marginBottom: spacing.md,
        lineHeight: 22,
    },
});