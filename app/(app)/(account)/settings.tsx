import { BackButton, Button, SettingsTab } from '@/shared/components';
import { SETTINGS_OPTIONS } from '@/shared/const/settings.const';
import { authService } from '@/shared/services/auth.service';
import { baseStyles, colors, spacing } from '@/shared/styles/design.system';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
    const { t } = useTranslation();

    const handleLogout = async () => {
        await authService.logout();
    };

    const renderSettingTabs = () => {
        return SETTINGS_OPTIONS.map((setting, index) => (
            <SettingsTab key={index} copy={setting.copy} icon={setting.icon} path={setting.path} />
        ));
    };

    return (
        <SafeAreaView style={styles.sAccount}>
            <ScrollView style={styles.svAccount} showsVerticalScrollIndicator={false}>
                <BackButton style={styles.backBtn} />
                <View style={styles.cTitle}>
                    <Text style={baseStyles.h1}>{t('settings.title')}</Text>
                </View>

                <View style={styles.cSettingTabs}>{renderSettingTabs()}</View>
            </ScrollView>

            <View style={styles.cButton}>
                <Button copy="settings.buttons.logout" onPress={handleLogout} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sAccount: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 25,
        position: 'relative',
    },
    svAccount: {
        paddingTop: spacing.xxl,
        flex: 1,
    },
    cTitle: {
        alignItems: 'center',
        marginBottom: spacing.xxl,
    },
    backBtn: {
        top: spacing.md,
    },
    cSettingTabs: {
        gap: 16,
    },
    cButton: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
    },
});
