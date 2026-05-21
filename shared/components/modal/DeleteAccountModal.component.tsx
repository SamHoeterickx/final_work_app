import { useRouter } from 'expo-router';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// COMPONENTS
import { Button } from '../buttons/Button.component';
import { InputField } from '../inputField/InputField.component';

// HOOKS
import { useDeleteUser } from '@/shared/hooks';

// STYLES
import { baseStyles, borderRadius, colors, spacing } from '@/shared/styles/design.system';

// TYPES
import { IDeleteUserCredentials, IModalProps } from '@/shared/types/types';

export const DeleteUserModal: FC<IModalProps> = ({ isModalOpen, setIsModalOpen }) => {
    const [formData, setFormData] = useState<IDeleteUserCredentials>({
        password: '',
    });

    const { t } = useTranslation();

    const { mutate, isPending, isError, error } = useDeleteUser();

    const router = useRouter();

    const handleDeleteAccount = () => {
        mutate(formData, {
            onSuccess: () => {
                setIsModalOpen(false);
                router.replace('/(auth)/startApp');
            },
        });
    };

    const handleFormInput = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
        >
            <View style={styles.overlay}>
                <TouchableOpacity
                    style={styles.backdrop}
                    onPress={() => setIsModalOpen(false)}
                    activeOpacity={1}
                />

                <View style={styles.modalContent}>
                    <View style={styles.dragIndicator} />
                    
                    <View style={styles.cText}>
                        <Text style={[baseStyles.h2, styles.text]}>{t('settings.deleteAccount.title')}</Text>
                        <Text style={[baseStyles.h4, styles.text]}>{t('settings.deleteAccount.subtitle')}</Text>
                    </View>

                    <InputField
                        name="password"
                        placeholder={t('settings.deleteAccount.placeholder')}
                        onChangeText={handleFormInput}
                        autoCapitalize="none"
                        spellCheck={false}
                        secureTextEntry={true}
                    />

                    {isError && <Text style={baseStyles.errorText}>{String(error)}</Text>}

                    <View style={styles.cButton}>
                        <Button
                            copy="settings.profile.buttons.delete"
                            onPress={handleDeleteAccount}
                            disabled={isPending}
                        />
                        <Button
                            copy="settings.profile.buttons.cancel"
                            onPress={() => setIsModalOpen(false)}
                            styles={'secundary'}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    backdrop: {
        flex: 1,
        width: '100%',
    },
    modalContent: {
        height: '75%',
        width: '100%',
        backgroundColor: colors.background,
        borderTopLeftRadius: borderRadius.lg,
        borderTopRightRadius: borderRadius.lg,
        paddingTop: spacing.md,
        paddingBottom: spacing.xl,
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    dragIndicator: {
        width: 40,
        height: 4,
        backgroundColor: colors.text.muted,
        borderRadius: borderRadius.full,
        marginBottom: spacing.xl,
    },
    cText: {
        alignItems: 'center',
        marginBottom: spacing.xl,
        gap: spacing.sm,
    },
    cButton: {
        alignItems: 'center',
        marginTop: 'auto',
        width: '100%',
        gap: spacing.md,
    },
    text: {
        textAlign: 'center',
    }
});
