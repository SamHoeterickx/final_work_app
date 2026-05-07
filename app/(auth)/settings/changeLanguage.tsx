import { SafeAreaView } from 'react-native-safe-area-context';
import WheelPicker from '@quidone/react-native-wheel-picker';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

// COMPONENTS
import { BackButton, Button } from '@/shared/components';

// CONTEXT
import { useUserPreferencesStore } from '@/shared/context/userPreferencesStore.context';

// TYPES
import { ELocales } from '@/shared/types/types';

//CONST
import { languageData } from '@/shared/const/changeLanguage.const';

// STYLES
import { baseStyles } from '@/shared/styles/design.system';

export default function ChangeLanguage() {
    const [selectedLanguage, setSelectedLanguage] = useState<ELocales | null>(null);

    const { language, setLanguage } = useUserPreferencesStore();

    const { i18n, t } = useTranslation();
    const router = useRouter();

    useEffect(() => {
        setSelectedLanguage(language);
    }, []);

    const handleChangeLanguage = () => {
        if (!selectedLanguage) return;

        i18n.changeLanguage(selectedLanguage);
        setLanguage(selectedLanguage);

        router.back();
    };

    return (
        <SafeAreaView style={[baseStyles.container, { position: 'relative' }]}>
            <Text style={[baseStyles.h2, styles.title]}>{t('changeLanguage.title')}</Text>
            <View style={styles.pickerContainer}>
                <WheelPicker
                    data={languageData}
                    value={selectedLanguage || ELocales.EN}
                    onValueChanged={({ item: { value } }) => setSelectedLanguage(value as ELocales)}
                    enableScrollByTapOnItem={true}
                />
            </View>
            <Button copy="changeLanguage.buttons.update" onPress={handleChangeLanguage} />
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
