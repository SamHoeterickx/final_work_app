import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENTS
import { LoadingScreen, SvgIcon } from '@/shared/components';

// HOOKS
import { useGetUserdata } from '@/shared/hooks';

// CONST
import { PROGRESSION_LEVELS } from '@/shared/const/account.const';

// STYLES
import { baseStyles, borderRadius, colors, spacing } from '@/shared/styles/design.system';

// TYPES
import { ESvgIconName } from '@/shared/types/enums';
import { useUserDataStore } from '@/shared/context/userDataStore.context';
import { useEffect, useState } from 'react';

export default function AccountScreen() {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<any | null>(null);

    const router = useRouter();

    // const { data, isPending, isError, error } = useGetUserdata();

    const { getUserData, name, xp, streaks, longestStreak } = useUserDataStore();

    useEffect(() => {
        setIsPending(true);
        setIsError(false);
        setError(null);
        try{
            getUserData();
        }catch(error) {
            throw error;
        }finally {
            setIsPending(false);
        }
    }, []);

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
                        </>
                    )}
                </View>

                {/* <View style={styles.cStats}>
                    <View style={styles.wStats}>
                        <SvgIcon name={ESvgIconName.BEAN_1} style={styles.statsIcon} />
                        <View style={styles.wStatsText}>
                            <Text style={baseStyles.h2}>3</Text>
                        </View>
                    </View>
                    <View style={styles.wStats}>
                        <SvgIcon name={ESvgIconName.BEAN_1} style={styles.statsIcon} />
                        <View style={styles.wStatsText}>
                            <Text style={baseStyles.h2}>3</Text>
                        </View>
                    </View>
                </View> */}
{/* 
                <View style={styles.cStreaks}>
                    <Text style={[baseStyles.h2, styles.subtitle]}>Your Streaks</Text>
                    <View style={styles.cStats}>
                        <View style={styles.wStatsText}>
                            <Text style={baseStyles.h2}>{streaks}</Text>
                            <Text style={[baseStyles.p, styles.label]}>CURRENT</Text>
                        </View>
                        <View style={styles.wStatsText}>
                            <Text style={baseStyles.h2}>{longestStreak}</Text>
                            <Text style={[baseStyles.p, styles.label]}>LONGEST</Text>
                        </View>
                    </View>
                </View> */}
                {/* 
                <View style={styles.cBadge}>
                    <Text style={[baseStyles.h2, styles.subtitle]}>Your Badges</Text>
                    <ScrollView 
                        contentContainerStyle={styles.svBadges}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            badges && badges.map((badge, index) => (
                                <Image
                                    style={[styles.badge, { opacity: badge.status === EProgressStatus.LOCKED ? 0.1 : badge.status === EProgressStatus.INPROGRESS || badge.status === EProgressStatus.UNLOCKED ? 0.5 : 1 }]}
                                    source={require("@/assets/images/moka_pot_island.png")}
                                    resizeMode='contain'
                                    key={index}
                                />
                            ))
                        }
                    </ScrollView>
                </View> */}
            </ScrollView>

            {/* 
                <View style={styles.wStats}>
                    <SvgIcon name={ESvgIconName.BEAN_1} style={styles.statsIcon} />
                    <View style={styles.wStatsText}>
                        <Text style={baseStyles.h2}>3</Text>
                        <Text style={[baseStyles.h4, styles.label]}>BEGINNER</Text>
                    </View>
                </View>
            */}
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
});
