import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENTS
import {
    BackButton,
    Chapter,
    HomeHeader,
    LoadingScreen,
    SwipeIndicator,
} from '@/shared/components';

// HOOKS
import { useHomeStore } from '@/shared/context/homeStore.context';
import { useGetChapters, useSwipe } from '@/shared/hooks';

// CONST
import { LOADING_MESSAGE_KEYS } from '@/shared/const/loadingScreen.const';

// STYLES
import { baseStyles, colors, spacing } from '@/shared/styles/design.system';

// TYPES
import { EProgressStatus } from '@/shared/types/enums';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const activeChapterIndex = useHomeStore((state) => state.activeChapterIndex);
    const chapterIndex = useHomeStore((state) => state.chapterIndex);
    const allChapters = useHomeStore((state) => state.allChapters);
    const isScreenActive = useHomeStore((state) => state.isScreenActive);
    const setAllChapters = useHomeStore((state) => state.setAllChapters);
    const updateChapterIndex = useHomeStore((state) => state.updateChapterIndex);
    const returnToCurrentChapter = useHomeStore((state) => state.returnToCurrentChapter);
    const setIsScreenActive = useHomeStore((state) => state.setIsScreenActive);

    const slideAnim = useRef(new Animated.Value(0)).current;
    const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

    const { data: userChapters, isPending, refetch, isError, error } = useGetChapters();
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

    useFocusEffect(
        useCallback(() => {
            if (refetch) {
                refetch();
            }
            setIsFocused(false);
            returnToCurrentChapter();
            handleUserInteraction();
        }, [refetch, returnToCurrentChapter]),
    );

    useEffect(() => {
        if (!userChapters) return;
        setAllChapters(userChapters);
    }, [userChapters, setAllChapters]);

    useEffect(() => {
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }
        if (isScreenActive) {
            inactivityTimerRef.current = setTimeout(() => {
                setIsScreenActive(false);
            }, 10000);
        }
        return () => {
            if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
        };
    }, [isScreenActive, setIsScreenActive]);

    const handleUserInteraction = useCallback(() => {
        if (!isScreenActive) {
            setIsScreenActive(true);
        } else {
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }
            inactivityTimerRef.current = setTimeout(() => {
                setIsScreenActive(false);
            }, 10000);
        }
    }, [isScreenActive, setIsScreenActive]);


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

    function handleReturnAnimated() {
        if (activeChapterIndex > chapterIndex) {
            animateTransition(chapterIndex, 'right');
        } else if (activeChapterIndex < chapterIndex) {
            animateTransition(chapterIndex, 'left');
        }
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
            {isPending && <LoadingScreen message={LOADING_MESSAGE_KEYS.LOADING_CHAPTERS} />}
            {isError && renderError()}
            <ScrollView
                contentContainerStyle={styles.wChapter}
                onTouchStart={(e) => {
                    onTouchStart(e);
                    handleUserInteraction();
                }}
                onTouchEnd={(e) => {
                    onTouchEnd(e);
                    handleUserInteraction();
                }}
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

            {!isFocused && <HomeHeader onReturnPress={handleReturnAnimated} />}
            {!isScreenActive && !isFocused && <SwipeIndicator />}
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
