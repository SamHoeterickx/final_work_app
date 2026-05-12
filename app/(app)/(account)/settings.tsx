import { BackButton, Button, SvgIcon } from '@/shared/components';
import { baseStyles, colors, spacing } from '@/shared/styles/design.system';
import { ESvgIconName } from '@/shared/types/enums';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {

    const handleOpenAccountSettings = () => {

    }

    const handleLogout = () => {

    }

    return (
        <SafeAreaView style={styles.sAccount}>
            <ScrollView
                style={styles.svAccount}
                showsVerticalScrollIndicator={false}
            >
                <BackButton style={styles.backBtn} />
                <View style={styles.cTitle}>
                    <Text style={baseStyles.h1}>Settings</Text>
                </View>

                <View style={styles.cSettingTabs}>
                    <TouchableOpacity
                        onPress={handleOpenAccountSettings}
                        style={styles.wSettingTab}
                    >
                        <SvgIcon name={ESvgIconName.ACCOUNT} width={32} height={32} />
                        <Text style={baseStyles.h2}>Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleOpenAccountSettings}
                        style={styles.wSettingTab}
                    >
                        <SvgIcon name={ESvgIconName.NOTIFICATIONS} width={32} height={32} />
                        <Text style={baseStyles.h2}>Notifications</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleOpenAccountSettings}
                        style={styles.wSettingTab}
                    >
                        <SvgIcon name={ESvgIconName.INFO} width={32} height={32} />
                        <Text style={baseStyles.h2}>About</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleOpenAccountSettings}
                        style={styles.wSettingTab}
                    >
                        <SvgIcon name={ESvgIconName.PRIVACY} width={32} height={32} />
                        <Text style={baseStyles.h2}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleOpenAccountSettings}
                        style={styles.wSettingTab}
                    >
                        <SvgIcon name={ESvgIconName.LEGAL} width={32} height={32} />
                        <Text style={baseStyles.h2}>Terms of agreement</Text>
                    </TouchableOpacity>
                </View>
            
            </ScrollView>

            <View style={styles.cButton}>
                <Button 
                    copy='LOGOUT'
                    onPress={handleLogout}
                />
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sAccount: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 25,
        position: 'relative'
    },
    svAccount: {
        paddingTop: spacing.xxl,
        flex: 1
    },
    cTitle: {
        alignItems: 'center',
        marginBottom: spacing.xxl,
    },
    backBtn: {
        top: spacing.md
    },
    cSettingTabs: {
        gap: 16
    },
    wSettingTab: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 32,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    cButton: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
    },
})
