import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

// COMPONENTS
import { Button, InputField } from '@/shared/components';

// STYLES
import { baseStyles, spacing } from '@/shared/styles/design.system';

export const ChangeEmailSettings: FC = () => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        email: '',
    });

    const { t } = useTranslation();

    const handleFormInput = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChangeEmail = () => {
        if (formData.email === '') return;
        // TODO: Implement authenticated change email logic
        console.warn('Change email not implemented.');
    };

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.wInputField}>
                    <Text style={[baseStyles.h4, styles.inputLabel]}>
                        {t('register.fieldLabels.email')}
                    </Text>
                    <InputField
                        onChangeText={handleFormInput}
                        name="email"
                        placeholder={t('register.fieldLabels.email')}
                        autoCapitalize="none"
                        spellCheck={false}
                        inputMode="email"
                    />
                </View>
            </View>

            <View style={styles.cButton}>
                <Button
                    copy="changeLanguage.buttons.update"
                    onPress={handleChangeEmail}
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