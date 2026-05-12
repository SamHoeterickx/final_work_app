import { Animated, Easing, Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';

// COMPONENTS
import { Button, LanguageButton } from '@/shared/components';

// STYLES
import { baseStyles, borderRadius, colors, spacing } from '@/shared/styles/design.system';

export default function StartAppScreen() {
    const router = useRouter();

    const floatAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(floatAnim, {
                    toValue: 0,
                    duration: 2000,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, [floatAnim]);

    return (
        <SafeAreaView style={[baseStyles.container]}>
            <Image
                style={styles.logo}
                source={require('@/assets/logos/png/brewlingo_logo_v2.png')}
                resizeMode="contain"
            />

            <View style={styles.wIsland}>
                <Animated.Image
                    style={[
                        styles.modelPreview,
                        {
                            transform: [
                                {
                                    translateY: floatAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, -20],
                                    }),
                                },
                            ],
                        },
                    ]}
                    source={require('@/assets/images/moka_pot_1.png')}
                    resizeMode="contain"
                />
                <Animated.View
                    style={[
                        styles.islandShadow,
                        {
                            transform: [
                                {
                                    rotateX: '75deg',
                                },
                                {
                                    scale: floatAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1, 0.8],
                                    }),
                                },
                            ],
                        },
                    ]}
                />
            </View>

            <View style={baseStyles.xlButton}>
                <LanguageButton />
                <Button
                    copy="startApp.buttons.onboarding"
                    onPress={() => router.navigate('/(auth)/onboarding')}
                    size="large"
                />
                <Button
                    copy="startApp.buttons.login"
                    onPress={() => router.navigate('/(auth)/login')}
                    styles="secundary"
                    size="large"
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: '65%',
        marginTop: spacing.xxl * 1.5,
    },
    wIsland: {
        width: '100%',
        height: 300,
        alignItems: 'center',
    },
    modelPreview: {
        width: '100%',
        height: 300,
        alignItems: 'center',
        zIndex: 3,
    },
    islandShadow: {
        width: 60,
        aspectRatio: 1 / 1,
        backgroundColor: colors.shadow,
        opacity: 0.1,
        borderRadius: borderRadius.full,
        marginTop: -20,
        zIndex: 1,
    },
});
