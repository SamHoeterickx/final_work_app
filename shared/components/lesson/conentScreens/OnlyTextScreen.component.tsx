import { baseStyles, spacing } from '@/shared/styles/design.system';
import { ILessonScreenProps } from '@/shared/types/types';
import { renderFormattedText } from '@/shared/utils/text.utils';
import { FC, useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';

const AnimatedTextItem: FC<{ text: string; isActive: boolean }> = ({ text, isActive }) => {
    
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
            })
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
        outputRange: [0.94, 1]
    });

    const activeOpacity = focusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.35, 1]
    });

    return (
        <Animated.View style={[
            styles.textBlockWrapper,
            {
                opacity: opacityAnim,
                transform: [
                    { translateY: translateYAnim },
                    { scale: scale }
                ]
            }
        ]}>
            <Animated.View style={{ opacity: activeOpacity }}>
                <Text style={[baseStyles.p, styles.bodyText]}>
                    {renderFormattedText(text)}
                </Text>
            </Animated.View>
        </Animated.View>
    );
};

export const OnlyTextScreen: FC<ILessonScreenProps> = ({ content, subStep = 0 }) => {
    if (!content) return null;

    const bodyArray = Array.isArray(content.body) ? content.body : [content.body];
    const textsToRender = bodyArray.slice(0, subStep + 1);
    const scrollViewRef = useRef<ScrollView>(null);

    return (
        <View style={styles.wrapper}>
            {content.title && (
                <Text style={[baseStyles.h2, styles.title]}>
                    {content.title}
                </Text>
            )}
            
            <ScrollView 
                ref={scrollViewRef}
                contentContainerStyle={styles.contentContainer}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                showsVerticalScrollIndicator={false}
            >
                {textsToRender.map((text: string, index: number) => {
                    const isActive = index === textsToRender.length - 1;
                    return (
                        <AnimatedTextItem 
                            key={index}
                            text={text} 
                            isActive={isActive} 
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: spacing.sm,
    },
    title: {
        textAlign: 'center',
        width: '100%',
        marginBottom: spacing.xl,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    contentContainer: {
        alignItems: 'center',
        width: '100%',
    },
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