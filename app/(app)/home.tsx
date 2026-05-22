import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENTS
import { BackButton, Chapter, HomeHeader, LoadingScreen } from '@/shared/components';

// HOOKS
import { useGetChapters, useSwipe } from '@/shared/hooks';

// STYLES
import { colors, spacing } from '@/shared/styles/design.system';

// TYPES
import { EProgressStatus } from '@/shared/types/enums';
import { IChapterUser } from '@/shared/types/types';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
    const [currentChapterIndex, setCurrentChapterIndex] = useState<number | null>(null);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const slideAnim = useRef(new Animated.Value(0)).current;

    const { data: userChapters, isPending, refetch } = useGetChapters();
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

    useFocusEffect(
        useCallback(() => {
            if (refetch) {
                refetch();
            }
            setIsFocused(false);
        }, [refetch])
    );

    useEffect(() => {
        if (!userChapters) return;

        const activeIndex = userChapters.findIndex(
            (chapter: IChapterUser) => chapter.status === EProgressStatus.INPROGRESS || chapter.status === EProgressStatus.UNLOCKED
        );

        if (activeIndex !== -1) {
            setCurrentChapterIndex(activeIndex);
        }
    }, [userChapters]);

    function animateTransition(newIndex: number, swipeDirection: 'left' | 'right') {
        if (isAnimating || currentChapterIndex === null) return;
        setIsAnimating(true);

        const outValue = swipeDirection === 'left' ? -width : width;
        const inValue = swipeDirection === 'left' ? width : -width;

        Animated.timing(slideAnim, {
            toValue: outValue,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setCurrentChapterIndex(newIndex);
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
        if (currentChapterIndex === null || currentChapterIndex <= 0) return;
        animateTransition(currentChapterIndex - 1, 'right');
    }

    function onSwipeLeft() {
        if (isFocused) return;
        if (
            currentChapterIndex === null ||
            !userChapters ||
            currentChapterIndex >= userChapters.length - 1
        )
            return;
        animateTransition(currentChapterIndex + 1, 'left');
    }

    return (
        <SafeAreaView style={styles.sHome}>
            {isPending && <LoadingScreen />}
            <ScrollView
                contentContainerStyle={styles.wChapter}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                scrollEnabled={false}
                style={{
                    opacity:
                        currentChapterIndex !== null &&
                        userChapters[currentChapterIndex].status === EProgressStatus.LOCKED
                            ? 0.3
                            : 1,
                }}
            >
                {!isPending && currentChapterIndex !== null && userChapters && (
                    <Chapter
                        chapterUser={userChapters[currentChapterIndex]}
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
        marginTop: spacing.xxl * 2,
        flex: 1,
    },
});
