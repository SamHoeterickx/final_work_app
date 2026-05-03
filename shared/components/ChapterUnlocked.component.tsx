import { baseStyles } from "@/shared/styles/design.system";
import { IChapterUnlockedProps } from "@/shared/types/types";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Button } from "./buttons/Button.component";
import { SvgIcon } from "./SvgIcon.component";


export const ChapterUnlocked: FC<IChapterUnlockedProps> = ({ handleNext, chapter, islandPath }) => {
    const [isLocked, setIsLocked] = useState<boolean>(true);
    
    const unlockAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLocked(false);
        }, 1500)

        return () => clearTimeout(timer);
    }, [])

    useEffect(() => {
        if (!isLocked) {
            Animated.spring(unlockAnim, {
                toValue: 1,
                friction: 6,
                tension: 40,
                useNativeDriver: true,
            }).start();
        }
    }, [isLocked, unlockAnim]);

    const { t } = useTranslation();

    const lockedOpacity = unlockAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
    });
    const lockedScale = unlockAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.5],
    });

    const unlockedOpacity = unlockAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });
    const unlockedScale = unlockAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1],
    });

    return (
        <>
            <View style={styles.cHeader}>
                <Text style={[baseStyles.h2, styles.title]}>{t('postOnboardingFlow.chapterUnlocked.title')}</Text>
                <Text style={[baseStyles.p]}>{t('postOnboardingFlow.chapterUnlocked.description')}</Text>
            </View>
                <Text style={[baseStyles.h3]}>{chapter}</Text>
                {/* CANVAS */}
                <View style={styles.iconContainer}>
                    <Animated.View style={[styles.iconWrapper, { opacity: lockedOpacity, transform: [{ scale: lockedScale }] }]}>
                        <SvgIcon name="locked" />
                    </Animated.View>
                    <Animated.View style={[styles.iconWrapper, { opacity: unlockedOpacity, transform: [{ scale: unlockedScale }] }]}>
                        <SvgIcon name="unlocked" />
                    </Animated.View>
                </View>
            <View>

            </View>
            <Button
                copy="postOnboardingFlow.chapterUnlocked.buttons.continue"
                onPress={handleNext}
            />
        </>
    )
}

const styles = StyleSheet.create({
    cHeader: {
        alignItems: 'center',
        marginTop: 64
    },
    title: {
        marginBottom: 8,
    },
    iconContainer: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 16,
    },
    iconWrapper: {
        position: 'absolute',
    }
})