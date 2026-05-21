import { Canvas, useFrame } from '@react-three/fiber/native';
import { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Easing, StyleSheet, Text, Vibration, View } from 'react-native';
import * as THREE from 'three';

// COMPONENTS
import { SvgIcon } from '@/shared/components';

// STYLES
import { baseStyles, colors, spacing } from '@/shared/styles/design.system';

// TYPES
import { ELocales, ESvgIconName } from '@/shared/types/enums';

const FloatingIsland = () => {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.5;
            groupRef.current.position.y = Math.sin(t * 2) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            <mesh position={[0, -0.2, 0]}>
                <cylinderGeometry args={[1.5, 1.2, 0.4, 16]} />
                <meshStandardMaterial color="#4A5D44" />
            </mesh>
            <mesh position={[0, 0.2, 0]}>
                <boxGeometry args={[0.6, 0.6, 0.6]} />
                <meshStandardMaterial color="#D6D0C9" />
            </mesh>
        </group>
    );
};

export const ChapterUnlockedScreen: FC<{ chapter: any }> = ({ chapter }) => {
    const { t, i18n } = useTranslation();
    const locale = (i18n.language as ELocales) || ELocales.NL;

    const cName = chapter?.name?.[locale] || chapter?.name?.en || 'Nieuw Hoofdstuk';
    const cDescription = chapter?.description?.[locale] || chapter?.description?.en || '';

    const lockOpacity = useRef(new Animated.Value(1)).current;
    const lockScale = useRef(new Animated.Value(1)).current;
    const unlockOpacity = useRef(new Animated.Value(0)).current;
    const unlockScale = useRef(new Animated.Value(0.5)).current;

    const canvasOpacity = useRef(new Animated.Value(0)).current;
    const canvasScale = useRef(new Animated.Value(0.8)).current;

    const textOpacity = useRef(new Animated.Value(0)).current;
    const textTranslateY = useRef(new Animated.Value(40)).current;

    useEffect(() => {
        const timer1 = setTimeout(() => {
            Vibration.vibrate();

            Animated.parallel([
                Animated.timing(lockOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
                Animated.timing(lockScale, { toValue: 0.5, duration: 200, useNativeDriver: true }),
                Animated.timing(unlockOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.spring(unlockScale, {
                    toValue: 1,
                    tension: 60,
                    friction: 5,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 800);

        const timer2 = setTimeout(() => {
            Vibration.vibrate();

            Animated.parallel([
                Animated.timing(unlockOpacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(unlockScale, { toValue: 2, duration: 300, useNativeDriver: true }),

                Animated.timing(canvasOpacity, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.spring(canvasScale, {
                    toValue: 1,
                    tension: 40,
                    friction: 6,
                    useNativeDriver: true,
                }),

                Animated.timing(textOpacity, {
                    toValue: 1,
                    duration: 600,
                    delay: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(textTranslateY, {
                    toValue: 0,
                    duration: 600,
                    delay: 200,
                    easing: Easing.out(Easing.back(1.1)),
                    useNativeDriver: true,
                }),
            ]).start();
        }, 2200);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <View style={styles.wrapper}>
            <View style={styles.lockContainer}>
                <Animated.View
                    style={[
                        styles.absoluteCenter,
                        { opacity: lockOpacity, transform: [{ scale: lockScale }] },
                    ]}
                >
                    <SvgIcon
                        name={ESvgIconName.LOCKED}
                        width={120}
                        height={120}
                        color={colors.text.muted}
                    />
                </Animated.View>
                <Animated.View
                    style={[
                        styles.absoluteCenter,
                        { opacity: unlockOpacity, transform: [{ scale: unlockScale }] },
                    ]}
                >
                    <SvgIcon
                        name={ESvgIconName.UNLOCKED}
                        width={120}
                        height={120}
                        color={colors.primary}
                    />
                </Animated.View>
            </View>

            <Animated.View
                style={[
                    styles.canvasContainer,
                    { opacity: canvasOpacity, transform: [{ scale: canvasScale }] },
                ]}
            >
                <Canvas camera={{ position: [0, 3, 6], fov: 40 }}>
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[10, 10, 10]} intensity={1.5} />
                    <directionalLight position={[-10, 10, -10]} intensity={0.5} />
                    <FloatingIsland />
                </Canvas>
            </Animated.View>

            <Animated.View
                style={[
                    styles.textGroup,
                    { opacity: textOpacity, transform: [{ translateY: textTranslateY }] },
                ]}
            >
                <Text style={styles.tag}>{t('lesson.postFlow.chapterUnlocked.tag')}</Text>
                <Text style={[baseStyles.h2, styles.title]}>{cName}</Text>
                {cDescription ? (
                    <Text style={[baseStyles.p, styles.desc]}>{cDescription}</Text>
                ) : null}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.md,
    },
    lockContainer: {
        position: 'absolute',
        top: '40%',
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    absoluteCenter: {
        position: 'absolute',
    },
    canvasContainer: {
        width: '100%',
        height: 350,
        marginTop: -50,
        zIndex: 5,
    },
    textGroup: {
        width: '100%',
        alignItems: 'center',
        marginTop: spacing.xl,
        zIndex: 5,
    },
    tag: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.primary,
        letterSpacing: 3,
        textTransform: 'uppercase',
        marginBottom: spacing.md,
        textAlign: 'center',
    },
    title: {
        color: colors.text.primary,
        fontSize: 36,
        textAlign: 'center',
        lineHeight: 42,
    },
    desc: {
        marginTop: spacing.lg,
        textAlign: 'center',
        color: colors.text.muted,
        lineHeight: 26,
    },
});
