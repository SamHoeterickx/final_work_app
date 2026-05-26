import { useRouter } from 'expo-router';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

// COMPONENTS
import { Button, InputField } from '@/shared/components';

// HOOKS
import { useUpdateUsername } from '@/shared/hooks';

// CONTEXT
import { useUserDataStore } from '@/shared/context/userDataStore.context';

// STYLES
import { baseStyles, spacing } from '@/shared/styles/design.system';

// TYPES
import { IUpdateUsernameCredentials } from '@/shared/types/types';

export const ChangeNameSettings: FC = () => {
    const [formData, setFormData] = useState<IUpdateUsernameCredentials>({
        updatedUsername: '',
    });

    const { mutate, isPending, isError, error } = useUpdateUsername();
    const { name } = useUserDataStore();

    const router = useRouter();
    const { t } = useTranslation();

    const handleFormInput = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChangeName = () => {
        if (formData.updatedUsername === '') return;
        mutate(formData, {
            onSuccess: () => router.back(),
        });
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
                        name="updatedUsername"
                        placeholder={t('register.fieldLabels.name')}
                        spellCheck={false}
                        defaultValue={name}
                    />
                </View>
                {isError && <Text style={baseStyles.errorText}>{String(error)}</Text>}
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
