import { baseStyles, spacing } from '@/shared/styles/design.system';
import { ILessonScreenProps } from '@/shared/types/types';
import { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Dimensions, Easing, StyleSheet, View, Text } from 'react-native';

const HEIGHT = Dimensions.get('screen').height;

export const TitleScreen: FC<ILessonScreenProps> = ({ content }) => {
    const posAnim = useRef(new Animated.Value(HEIGHT / 6)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const scaleLineAnim = useRef(new Animated.Value(0)).current;

    const { t } = useTranslation();

    useEffect(() => {
        Animated.timing(posAnim, {
            toValue: 0,
            easing: Easing.out(Easing.quad),
            duration: 900,
            useNativeDriver: true
        }).start();

        Animated.timing(scaleLineAnim, {
            toValue: 1,
            easing: Easing.out(Easing.quad),
            duration: 800,
            useNativeDriver: true
        }).start();

        const timer = setTimeout(() => {
            Animated.timing(opacityAnim, {
                toValue: 1,
                easing: Easing.linear,
                duration: 800,
                useNativeDriver: true
            }).start();
        }, 600);

        return () => clearTimeout(timer);
    }, [posAnim, opacityAnim, scaleLineAnim]);

    return (
        <View style={styles.wTitleScreen}>
            <View style={styles.innerContainer}>
                
                <Animated.Text style={[styles.chapterTag, { opacity: opacityAnim }]}>
                    { t('lesson.titleScreen.introduction') }
                </Animated.Text>

                <Animated.Text style={[
                    baseStyles.h1, 
                    styles.title,
                    { transform: [{ translateY: posAnim }] }
                ]}>
                    {content.title}
                </Animated.Text>        
                
                <Animated.View style={[
                    styles.accentBlock,
                    { transform: [{ scaleX: scaleLineAnim }] }
                ]} />

                <Animated.Text style={[
                    baseStyles.p,
                    styles.bodyText, 
                    { opacity: opacityAnim }
                ]}>
                    {content.body}
                </Animated.Text>        
                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wTitleScreen: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: spacing.xl || 32,
    },
    innerContainer: {
        alignItems: 'center',
        width: '100%',
    },
    chapterTag: {
        fontSize: 11,
        fontWeight: '700',
        color: '#4A5D44',
        letterSpacing: 4,
        textTransform: 'uppercase',
        marginBottom: 16,
    },
    title: {
        textAlign: 'center',
        width: '100%',
        textTransform: 'uppercase',
        fontSize: 38,
        lineHeight: 44,
        letterSpacing: 1,
        color: '#1A1A1A',
    },
    accentBlock: {
        width: '50%',
        height: 6, 
        backgroundColor: '#4A5D44',
        marginTop: 24,
        marginBottom: 32,
        borderRadius: 2,
    },
    bodyText: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 26,
        color: '#4A4A4A',
        maxWidth: 300,
    }
});