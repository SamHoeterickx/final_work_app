import { baseStyles, spacing } from '@/shared/styles/design.system';
import { ILessonScreenProps } from '@/shared/types/types';
import { FC, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export const ImageWithMultipleTextScreen: FC<ILessonScreenProps> = ({ content, subStep = 0 }) => {
    const bodyArray = Array.isArray(content.body) ? content.body : [content.body];
    const textsToRender = bodyArray.slice(0, subStep + 1);

    const imageOpacityAnim = useRef(new Animated.Value(1)).current;
    const imageHeightAnim = useRef(new Animated.Value(250)).current;
    const imageMarginAnim = useRef(new Animated.Value(spacing.xl)).current;

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
                    {textsToRender.map((text: string, index: number) => (
                        <Text key={index} style={[baseStyles.p, styles.bodyText]}>{text}</Text>
                    ))}
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
        marginBottom: spacing.md,
        lineHeight: 22,
    },
});