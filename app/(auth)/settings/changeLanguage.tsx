import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text} from 'react-native';
import { useTranslation } from 'react-i18next';

// COMPONENTS
import { BackButton, ChangeLanguageSettings } from '@/shared/components';

// STYLES
import { baseStyles } from '@/shared/styles/design.system';

export default function ChangeLanguage() {

    const { t } = useTranslation();
    return (
        <SafeAreaView style={[baseStyles.container, { position: 'relative' }]}>
            <Text style={[baseStyles.h2, styles.title]}>{t('changeLanguage.title')}</Text>

            <ChangeLanguage />

            <BackButton style={{ left: 0 }} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pickerContainer: {
        height: 250,
        width: '100%',
        justifyContent: 'center',
    },
    title: {
        marginTop: 36,
    },
});
