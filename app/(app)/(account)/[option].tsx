import { BackButton, SettingsOptionsWrapper } from '@/shared/components';
import { baseStyles, colors, spacing } from '@/shared/styles/design.system';
import { ESettingsOptions } from '@/shared/types/enums';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileSettingsScreen() {
    const { option } = useLocalSearchParams();
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.sProfileSettings}>
            <ScrollView
                style={styles.svProfileSettings}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.svContentContainer}
            >
                <BackButton style={styles.backBtn} />
                <View style={styles.cTitle}>
                    <Text style={[baseStyles.h1, styles.title]}>
                        {t(`settings.${option}.title`)}
                    </Text>
                </View>

                <SettingsOptionsWrapper option={option as ESettingsOptions} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sProfileSettings: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 25,
        position: 'relative',
    },
    svProfileSettings: {
        paddingTop: spacing.xxl,
        flex: 1,
    },
    svContentContainer: {
        flexGrow: 1,
    },
    cTitle: {
        alignItems: 'center',
        marginBottom: spacing.xxl,
        paddingHorizontal: '12.5%',
    },
    title: {
        textAlign: 'center',
        fontSize: 36,
        marginTop: spacing.sm,
    },
    backBtn: {
        top: spacing.md,
    },
});
