import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

// COMPONENTS
import { Button, InputField } from '@/shared/components';

// STYLES
import { baseStyles, spacing } from '@/shared/styles/design.system';

export const ChangeNameSettings: FC = () => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        name: '',
    });

    const { t } = useTranslation();

    const handleFormInput = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChangeName = () => {
        if (formData.name === '') return;
        // TODO: Implement authenticated change name logic
        console.warn('Change name not implemented.');
    };

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.wInputField}>
                    <Text style={[baseStyles.h4, styles.inputLabel]}>
                        {t('register.fieldLabels.name')}
                    </Text>
                    <InputField
                        onChangeText={handleFormInput}
                        name="name"
                        placeholder={t('register.fieldLabels.name')}
                        autoCapitalize="words"
                        spellCheck={false}
                    />
                </View>
            </View>

            <View style={styles.cButton}>
                <Button
                    copy="changeLanguage.buttons.update"
                    onPress={handleChangeName}
                    disabled={isPending}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    wInputField: {
        marginBottom: spacing.lg,
    },
    inputLabel: {
        marginBottom: spacing.sm,
    },
    cButton: {
        alignItems: 'center',
        marginTop: spacing.xxl,
    },
});