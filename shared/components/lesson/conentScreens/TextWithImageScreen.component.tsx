import { baseStyles, spacing } from '@/shared/styles/design.system';
import { ILessonScreenProps } from '@/shared/types/types';
import { FC, useEffect, useRef } from 'react';
import { Animated, Easing, ScrollView, StyleSheet, Text, View } from 'react-native';

const IMAGE_HEIGHT = 250;

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
                    {text}
                </Text>
            </Animated.View>
        </Animated.View>
    );
};

export const TextWithImageScreen: FC<ILessonScreenProps> = ({ content, subStep = 0 }) => {
    if (!content) return null;

    const bodyArray = Array.isArray(content.body) ? content.body : [content.body];
    const textsToRender = bodyArray.slice(0, subStep + 1);
    const scrollViewRef = useRef<ScrollView>(null);

    const transitionAnim = useRef(new Animated.Value(subStep > 0 ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(transitionAnim, {
            toValue: subStep > 0 ? 1 : 0,
            duration: 600,
            easing: Easing.out(Easing.poly(3)), 
            useNativeDriver: true, 
        }).start();
    }, [subStep]);

    const imageTranslateY = transitionAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -IMAGE_HEIGHT - 50] 
    });
    
    const imageOpacity = transitionAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0, 0]
    });

    const textTranslateY = transitionAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [IMAGE_HEIGHT, 0]
    });

    return (
        <View style={styles.wrapper}>
            {content.title && (
                <Text style={[baseStyles.h2, styles.title]}>
                    {content.title}
                </Text>
            )}
            
            <View style={styles.contentContainer}>
                
                <Animated.View style={[
                    styles.imageAbsoluteWrapper,
                    { 
                        opacity: imageOpacity, 
                        transform: [{ translateY: imageTranslateY }] 
                    }
                ]}>
                    <Animated.Image
                        style={styles.image}
                        source={require('@/assets/images/moka_pot_1.png')}
                        resizeMode='contain'
                    />
                </Animated.View>

                <Animated.View style={[
                    styles.scrollContainerWrapper,
                    { transform: [{ translateY: textTranslateY }] }
                ]}>
                    <ScrollView 
                        ref={scrollViewRef}
                        contentContainerStyle={styles.scrollContent}
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
                        
                        <View style={{ height: 40 }} /> 
                    </ScrollView>
                </Animated.View>

            </View>
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
        flex: 1,
        position: 'relative', 
        overflow: 'hidden',
    },
    imageAbsoluteWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: IMAGE_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    scrollContainerWrapper: {
        flex: 1,
        zIndex: 2,
    },
    scrollContent: {
        alignItems: 'center',
        width: '100%',
        paddingTop: spacing.md, 
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