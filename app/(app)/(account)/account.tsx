import { SvgIcon } from '@/shared/components';
import { baseStyles, borderRadius, colors, spacing } from '@/shared/styles/design.system';
import { EProgressStatus, ESvgIconName } from '@/shared/types/enums';

import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const badges = [
    {
        status: EProgressStatus.COMPLETED
    },
    {
        status: EProgressStatus.COMPLETED
    },
    {
        status: EProgressStatus.COMPLETED
    },
    {
        status: EProgressStatus.INPROGRESS
    },
    {
        status: EProgressStatus.LOCKED
    },
    {
        status: EProgressStatus.LOCKED
    },
    {
        status: EProgressStatus.LOCKED
    },
    {
        status: EProgressStatus.LOCKED
    },
    {
        status: EProgressStatus.LOCKED
    },
    {
        status: EProgressStatus.LOCKED
    },
    {
        status: EProgressStatus.LOCKED
    },
    {
        status: EProgressStatus.LOCKED
    },
    {
        status: EProgressStatus.LOCKED
    },
    {
        status: EProgressStatus.LOCKED
    },
    {
        status: EProgressStatus.LOCKED
    },
    
]

export default function AccountScreen() {
    const router = useRouter();

    const handleOpenSettings = () => {
        router.push('/(app)/(account)/settings')
    }

    return (
        <SafeAreaView style={styles.sAccount}>
            <ScrollView
                style={styles.svAccount}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.cHeader}>
                    <TouchableOpacity
                        style={styles.cSettings}
                        onPress={handleOpenSettings}
                    >
                        <SvgIcon name={ESvgIconName.SETTINGS} />
                    </TouchableOpacity>
                </View>
                <View style={styles.cTitle}>
                    <Text style={baseStyles.h1}>Mike Derycke</Text>
                    <Text style={[baseStyles.h4, styles.userLevel]}>BEGINNER</Text>
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

                <View style={styles.cStreaks}>
                    <Text style={[baseStyles.h2, styles.subtitle]}>Your Streaks</Text>
                    <View style={styles.cStats}>
                        <View style={styles.wStatsText}>
                            <Text style={baseStyles.h2}>3</Text>
                            <Text style={[baseStyles.p, styles.label]}>CURRENT</Text>
                        </View>
                        <View style={styles.wStatsText}>
                            <Text style={baseStyles.h2}>3</Text>
                            <Text style={[baseStyles.p, styles.label]}>LONGEST</Text>
                        </View>
                    </View>
                </View>

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
                </View>
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
    cStats: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: spacing.xxl,
        paddingHorizontal: 25,
    },
    wStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 24,
        paddingHorizontal: 32,
        paddingVertical: 12,
        backgroundColor: colors.text.secondary,
        borderRadius: borderRadius.lg
    },
    statsIcon: {
        width: 48,
        aspectRatio: 1 / 1
    },
    wStatsText: {
        alignItems: 'center'
    },
    cStreaks: {
        paddingHorizontal: 25,
        backgroundColor: colors.text.secondary,
        paddingTop: spacing.xxl,
        marginBottom: spacing.xxl,
        borderRadius: borderRadius.lg
    },
    cBadge: {
        paddingHorizontal: 25,
    },
    svBadges: {
        gap: 32
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    label: {
        fontSize: 14
    },
    badge: {
        width: 124,
        aspectRatio: 1 / 1
    }
})
