
import { FC, useEffect, useRef } from 'react';
import { Animated, Easing, ScrollView, StyleSheet, Text, View } from 'react-native';

// COMPONENTS
import { AnimatedTextItem } from './AnimatedTextItem.component';

// STYLES
import { baseStyles, spacing } from '@/shared/styles/design.system';

// TYPES
import { ILessonScreenProps } from '@/shared/types/types';

const IMAGE_HEIGHT = 250;

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
});