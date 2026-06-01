import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENTS
import { BackButton, Chapter, HomeHeader, LoadingScreen } from '@/shared/components';

// HOOKS
import { useHomeStore } from '@/shared/context/homeStore.context';
import { useGetChapters, useSwipe } from '@/shared/hooks';

// STYLES
import { baseStyles, colors, spacing } from '@/shared/styles/design.system';

// TYPES
import { EProgressStatus } from '@/shared/types/enums';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const {
        activeChapterIndex,
        allChapters,
        setAllChapters,
        updateChapterIndex,
        returnToCurrentChapter,
    } = useHomeStore();

    const slideAnim = useRef(new Animated.Value(0)).current;

    const { data: userChapters, isPending, refetch, isError, error } = useGetChapters();
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

    useFocusEffect(
        useCallback(() => {
            if (refetch) {
                refetch();
            }
            setIsFocused(false);
            returnToCurrentChapter();
        }, [refetch, returnToCurrentChapter]),
    );

    useEffect(() => {
        if (!userChapters) return;
        setAllChapters(userChapters);
    }, [userChapters, setAllChapters]);

    function animateTransition(newIndex: number, swipeDirection: 'left' | 'right') {
        if (isAnimating || allChapters === null) return;
        setIsAnimating(true);

        const outValue = swipeDirection === 'left' ? -width : width;
        const inValue = swipeDirection === 'left' ? width : -width;

        Animated.timing(slideAnim, {
            toValue: outValue,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            updateChapterIndex(newIndex);
            slideAnim.setValue(inValue);

            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                setIsAnimating(false);
            });
        });
    }

    function onSwipeRight() {
        if (isFocused) return;
        if (allChapters === null || activeChapterIndex <= 0) return;
        animateTransition(activeChapterIndex - 1, 'right');
    }

    function onSwipeLeft() {
        if (isFocused) return;
        if (allChapters === null || activeChapterIndex >= allChapters.length - 1) return;
        animateTransition(activeChapterIndex + 1, 'left');
    }

    const renderError = () => {
        return (
            <View style={styles.error}>
                <Text style={[baseStyles.h2, styles.errorMessage]}>{String(error)}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.sHome}>
            {isPending && <LoadingScreen />}
            {isError && renderError()}
            <ScrollView
                contentContainerStyle={styles.wChapter}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                scrollEnabled={false}
                style={{
                    opacity:
                        allChapters &&
                        allChapters[activeChapterIndex]?.status === EProgressStatus.LOCKED
                            ? 0.3
                            : 1,
                }}
            >
                {!isPending && allChapters && allChapters[activeChapterIndex] && (
                    <Chapter
                        chapterUser={allChapters[activeChapterIndex]}
                        slideAnim={slideAnim}
                        isFocused={isFocused}
                        setIsFocused={setIsFocused}
                    />
                )}
            </ScrollView>
            {isFocused && (
                <BackButton
                    isFocused={isFocused}
                    setIsFocused={setIsFocused}
                    style={{ zIndex: 10, elevation: 10 }}
                />
            )}

            {!isFocused && <HomeHeader />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sHome: {
        backgroundColor: colors.background,
        flex: 1,
        position: 'relative',
    },
    wChapter: {
        width: width,
        flex: 1,
    },
    error: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
    },
    errorMessage: {
        textAlign: 'center',
    },
});
