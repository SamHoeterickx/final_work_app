import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

// COMPONENTS
import { BackButton, Button } from '@/shared/components';

// CONTEXT
import { useUserPreferencesStore } from '@/shared/context/userPreferencesStore.context';

// TYPES
import { ELocales } from '@/shared/types/types';

// STYLES
import { baseStyles } from '@/shared/styles/design.system';

export default function ChangeLanguage() {
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
        <SafeAreaView style={[baseStyles.container, { position: 'relative' }]}>
            <Text style={[baseStyles.h2, styles.title]}>Change language</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                >
                    <Picker.Item label="English" value={ELocales.EN} />
                    <Picker.Item label="Nederlands" value={ELocales.NL} />
                    <Picker.Item label="Francais" value={ELocales.FR} />
                </Picker>
            </View>
            <Button copy="Save Changes" onPress={handleChangeLanguage} />
            <BackButton style={{ left: 0 }} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pickerContainer: {
        height: 250,
        width: '100%',
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
    },
    picker: {
        width: '100%',
        height: 200,
    },
    pickerItem: {
        color: 'black',
        fontSize: 20,
        height: 200,
    },
    title: {
        marginTop: 36,
    },
});
