import WheelPicker from '@quidone/react-native-wheel-picker';
import { useRouter } from 'expo-router';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

// COMPONENTS
import { Button } from '../buttons/Button.component';

// CONTEXT
import { useUserDataStore } from '@/shared/context/userDataStore.context';

// CONST
import { languageData } from '@/shared/const/changeLanguage.const';

// TYPES
import { ELocales } from '@/shared/types/enums';
import { useChangePreferenceLanguage } from './useChangePreferenceLanguage.hook';

export const ChangeLanguageSettings: FC = () => {
    const { language, setLanguage } = useUserDataStore();

    const [selectedLanguage, setSelectedLanguage] = useState<ELocales>(language);

    const { mutate } = useChangePreferenceLanguage();

    const { i18n } = useTranslation();
    const router = useRouter();

    const handleChangeLanguage = () => {
        if (!selectedLanguage) return;

        i18n.changeLanguage(selectedLanguage);
        setLanguage(selectedLanguage);
        mutate(selectedLanguage);

        router.back();
    };

    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <WheelPicker
                    data={languageData}
                    value={selectedLanguage}
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
