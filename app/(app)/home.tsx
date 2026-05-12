import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENTS
import { LoadingScreen, Chapter } from '@/shared/components';

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

    const { data: userChapters, isPending } = useGetChapters();
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

    useEffect(() => {
        if (!userChapters) return;
        console.log(userChapters);

        userChapters.forEach((userChapter: IChapterUser, index: number) => {
            console.log(userChapter.status);
            if (
                userChapter.status === EProgressStatus.INPROGRESS ||
                userChapter.status === EProgressStatus.UNLOCKED
            ) {
                setCurrentChapterIndex(index);
            }
        });
    }, [userChapters]);

    useEffect(() => {
        console.log(currentChapterIndex);
    }, [currentChapterIndex]);

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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sHome: {
        backgroundColor: colors.background,
        flex: 1,
    },
    wChapter: {
        width: width,
        marginTop: spacing.xxl,
        flex: 1,
    },
});
