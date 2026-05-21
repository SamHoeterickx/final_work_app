import { FC, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';
import { useTranslation } from 'react-i18next';

// STYLES
import { baseStyles, borderRadius, colors, spacing } from '@/shared/styles/design.system';

// TYPES
import { ILessonScreenProps } from '@/shared/types/types';

// UTILS
import { renderFormattedText } from '@/shared/utils/text.utils';

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export const MatchQuizScreen: FC<ILessonScreenProps> = ({ content, onAnswerSelect }) => {
    
    const [shuffledItems, setShuffledItems] = useState<string[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [matchedItems, setMatchedItems] = useState<string[]>([]);
    const [isError, setIsError] = useState(false);
    
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(20)).current;
    
    const { t } = useTranslation();

    useEffect(() => {
        if (content?.pairs) {
            const allItems: string[] = [];
            content.pairs.forEach((p: any) => {
                allItems.push(p.item);
                allItems.push(p.match);
            });
            
            setShuffledItems(shuffleArray(allItems));
        }

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
    }, [content]);

    useEffect(() => {
        if (selectedItems.length === 2) {
            const [first, second] = selectedItems;
            
            const isCorrect = content?.pairs?.some(
                (p: any) => 
                    (p.item === first && p.match === second) || 
                    (p.item === second && p.match === first)
            );

            if (isCorrect) {
                const newMatched = [...matchedItems, first, second];
                setMatchedItems(newMatched);
                setSelectedItems([]);
                
                if (newMatched.length === content?.pairs?.length * 2) {
                    if (onAnswerSelect) {
                        onAnswerSelect(content.answer || "MATCHED_ALL");
                    }
                }
            } else {
                Vibration.vibrate();
                setIsError(true);
                setTimeout(() => {
                    setSelectedItems([]);
                    setIsError(false);
                }, 500); 
            }
        }
    }, [selectedItems, content]);

    const handleSelect = (item: string) => {
        if (matchedItems.includes(item)) return;

        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((i) => i !== item));
        } else if (selectedItems.length < 2) {
            setSelectedItems([...selectedItems, item]);
        }
    };

    if (!content) return null;

    return (
        <View style={styles.wrapper}>
            <Animated.View
                style={[
                    styles.contentContainer,
                    {
                        opacity: opacityAnim,
                        transform: [{ translateY: translateYAnim }],
                    },
                ]}
            >
                <View style={styles.headerSection}>
                    <Text style={styles.tag}>{t('lesson.quiz.tag', 'TEST JE KENNIS')}</Text>

                    {content.title && (
                        <Text style={[baseStyles.h2, styles.title]}>{content.title}</Text>
                    )}

                    {content.question && (
                        <Text style={[baseStyles.p, styles.questionText]}>
                            {renderFormattedText(content.question as string)}
                        </Text>
                    )}
                </View>

                <View style={styles.gridContainer}>
                    {shuffledItems.map((item, index) => {
                        const isSelected = selectedItems.includes(item);
                        const isMatched = matchedItems.includes(item);

                        return (
                            <TouchableOpacity
                                key={`item-${index}`}
                                style={[
                                    styles.card,
                                    isSelected && styles.cardSelected,
                                    isError && isSelected && styles.errorBorder,
                                    isMatched && styles.matchedItem,
                                ]}
                                onPress={() => handleSelect(item)}
                                disabled={isMatched || (selectedItems.length >= 2 && !isSelected)}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.cardText,
                                        isSelected && styles.cardTextSelected,
                                    ]}
                                >
                                    {renderFormattedText(item)}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1, 
        paddingHorizontal: spacing.sm,
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center', 
        paddingBottom: spacing.lg,
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    tag: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.primary,
        letterSpacing: 3,
        textTransform: 'uppercase',
        marginBottom: spacing.xs,
        textAlign: 'center',
    },
    title: {
        textAlign: 'center',
        width: '100%',
        marginBottom: spacing.xs,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    questionText: {
        textAlign: 'center',
        lineHeight: 22,
        fontSize: 15,
        color: colors.text.primary,
        paddingHorizontal: spacing.sm,
    },
    
    gridContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    
        marginBottom: -spacing.sm, 
    },
    card: {
        width: '48%', 
        minHeight: 110,
        marginBottom: spacing.sm, 
        padding: spacing.md,
        borderRadius: borderRadius.md,
        borderWidth: 2,
        borderColor: colors.text.muted + '80',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.primary,
    },
    cardText: {
        fontSize: 14, 
        lineHeight: 20, 
        color: colors.text.primary,
        textAlign: 'center',
    },
    cardTextSelected: {
        color: colors.text.secondary,
        fontWeight: 'bold',
    },
    
    errorBorder: {
        borderColor: '#D9534F',
        backgroundColor: 'transparent',
    },
    matchedItem: {
        opacity: 0.25, 
        borderColor: 'transparent', 
        backgroundColor: 'transparent',
    },
});