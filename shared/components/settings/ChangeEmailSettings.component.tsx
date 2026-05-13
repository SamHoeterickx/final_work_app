import { useRouter } from 'expo-router';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

// COMPONENTS
import { Button, InputField } from '@/shared/components';

// HOOKS
import { useUpdateEmail } from '@/shared/hooks';

// STYLES
import { baseStyles, spacing } from '@/shared/styles/design.system';

// TYPES
import { IUpdateEmailCredentials } from '@/shared/types/types';

export const ChangeEmailSettings: FC = () => {
    const [formData, setFormData] = useState<IUpdateEmailCredentials>({
        updatedEmailAdress: '',
    });

    const { mutate, isPending, isError, error } = useUpdateEmail();
    const router = useRouter();
    const { t } = useTranslation();

    const handleFormInput = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChangeEmail = () => {
        if (formData.updatedEmailAdress === '') return;
        mutate(formData, {
            onSuccess: () => router.back()
        });
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
                        name="updatedEmailAdress"
                        placeholder={t('register.fieldLabels.email')}
                        autoCapitalize="none"
                        spellCheck={false}
                        inputMode="email"
                    />
                </View>
            </View>

            {isError && <Text style={baseStyles.errorText}>{String(error)}</Text>}

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