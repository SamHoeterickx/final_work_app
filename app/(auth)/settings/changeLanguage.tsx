import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

// COMPONENTS
import { BackButton, ChangeLanguageSettings } from '@/shared/components';

// STYLES
import { baseStyles } from '@/shared/styles/design.system';

export default function ChangeLanguageScreen() {
    const { t } = useTranslation();
    return (
        <SafeAreaView style={[baseStyles.container, styles.sChangeLanguage]}>
            <Text style={[baseStyles.h2, styles.title]}>{t('changeLanguage.title')}</Text>

            <View style={styles.wChangeLanguage}>
                <ChangeLanguageSettings />
            </View>

            <BackButton style={{ left: 0 }} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sChangeLanguage: {
        position: 'relative',
    },
    title: {
        marginTop: 36,
    },
    wChangeLanguage: {
        height: '80%',
        width: '100%',
    },
});
