import WheelPicker from '@quidone/react-native-wheel-picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

// COMPONENTS
import { Button } from '../buttons/Button.component';

// CONTEXT
import { useUserPreferencesStore } from '@/shared/context/userPreferencesStore.context';

// CONST
import { languageData } from '@/shared/const/changeLanguage.const';

// TYPES
import { ELocales } from '@/shared/types/enums';

export const ChangeLanguageSettings = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<ELocales | null>(null);

    const { language, setLanguage } = useUserPreferencesStore();

    const { i18n } = useTranslation();
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
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <WheelPicker
                    data={languageData}
                    value={selectedLanguage || ELocales.EN}
                    onValueChanged={({ item: { value } }) => setSelectedLanguage(value as ELocales)}
                    enableScrollByTapOnItem={true}
                />
            </View>
            <View style={styles.cButton}>
                <Button copy="changeLanguage.buttons.update" onPress={handleChangeLanguage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    pickerContainer: {
        height: 250,
        width: '100%',
        justifyContent: 'center',
    },
    cButton: {
        alignItems: 'center',
        marginTop: 48,
    },
});
