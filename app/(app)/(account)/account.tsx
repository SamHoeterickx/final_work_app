import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENTS
import { LoadingScreen, SvgIcon } from '@/shared/components';

// CONST
import { PROGRESSION_LEVELS } from '@/shared/const/account.const';

// CONTEXT
import { useUserDataStore } from '@/shared/context/userDataStore.context';

// STYLES
import { baseStyles, borderRadius, colors, spacing } from '@/shared/styles/design.system';

// TYPES
import { ESvgIconName } from '@/shared/types/enums';

export default function AccountScreen() {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<any | null>(null);

    const router = useRouter();

    const { getUserData, name, xp, streaks, longestStreak } = useUserDataStore();

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                setIsPending(true);
                setIsError(false);
                setError(null);
                try {
                    await getUserData();
                } catch (err) {
                    setIsError(true);
                    setError(err);
                } finally {
                    setIsPending(false);
                }
            };
            fetchData();
        }, [getUserData]),
    );

    const { t } = useTranslation();

    const handleOpenSettings = () => {
        router.push('/(app)/(account)/settings');
    };

    const calculateUserLevel = (userXP: number) => {
        const currentLevel = PROGRESSION_LEVELS.find((level) => userXP >= level.threshold);

        return currentLevel ? currentLevel.key : 'account.userLevels.enthusiast';
    };

    return (
        <SafeAreaView style={styles.sAccount}>
            {isPending && <LoadingScreen />}
            <ScrollView style={styles.svAccount} showsVerticalScrollIndicator={false}>
                <View style={styles.cHeader}>
                    <TouchableOpacity style={styles.cSettings} onPress={handleOpenSettings}>
                        <SvgIcon name={ESvgIconName.SETTINGS} />
                    </TouchableOpacity>
                </View>

                <View style={styles.cTitle}>
                    {isError ? (
                        <Text style={baseStyles.errorText}>{error?.message}</Text>
                    ) : (
                        <>
                            <Text style={baseStyles.h1}>{name}</Text>
                            <Text style={[baseStyles.h4, styles.userLevel]}>
                                {t(calculateUserLevel(xp))}
                            </Text>
                            <Text style={styles.xpText}>{xp} XP</Text>
                        </>
                    )}
                </View>

                {!isError && <View style={styles.divider} />}

                {!isError && (
                    <View style={styles.cStreaks}>
                        <Text style={[baseStyles.h2, styles.sectionTitle]}>
                            {t('account.streaks.title')}
                        </Text>

                        <View style={styles.statsGrid}>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>{streaks || 0}</Text>
                                <Text style={styles.statLabel}>{t('account.streaks.current')}</Text>
                            </View>

                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>{longestStreak || 0}</Text>
                                <Text style={styles.statLabel}>{t('account.streaks.longest')}</Text>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sAccount: {
        flex: 1,
        backgroundColor: colors.background,
    },
    svAccount: {
        paddingTop: spacing.xxl,
    },
    cHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: spacing.lg,
        paddingHorizontal: 25,
    },
    cSettings: {
        width: 48,
        aspectRatio: 1 / 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.full,
        backgroundColor: colors.text.secondary,
    },
    cTitle: {
        alignItems: 'center',
        marginBottom: spacing.xxl,
    },
    userLevel: {
        fontSize: 26,
    },
    divider: {
        width: 50,
        height: 3,
        backgroundColor: colors.primary,
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: spacing.xxl,
        opacity: 0.8,
    },
    cStreaks: {
        width: '100%',
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
        marginBottom: spacing.xxl,
    },
    sectionTitle: {
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: spacing.lg,
        color: colors.primary,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    statCard: {
        width: '48%',
        paddingVertical: spacing.xl,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.md,
        borderWidth: 2,
        borderColor: colors.text.muted + '40',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statNumber: {
        fontSize: 56,
        fontWeight: '900',
        color: colors.text.primary,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.primary,
        textTransform: 'uppercase',
        letterSpacing: 2,
        textAlign: 'center',
    },
    xpText: {
        color: colors.text.muted,
        fontSize: 14,
        fontFamily: 'Vanguard-DemiBold',
        letterSpacing: 1,
    },
});
