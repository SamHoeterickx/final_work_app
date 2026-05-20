
import { FC, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// COMPONENTS
import { AnimatedTextItem } from './AnimatedTextItem.component';

// STYLES
import { baseStyles, spacing } from '@/shared/styles/design.system';

// TYPES
import { ILessonScreenProps } from '@/shared/types/types';

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
});