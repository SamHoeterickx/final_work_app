import { useRouter } from 'expo-router';
import { FC, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';

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
            animationType="fade"
            transparent={true}
            visible={isModalOpen}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setIsModalOpen(false);
            }}
        >
            <View style={styles.cModal}>
                <View style={styles.wModal}>
                    <View style={styles.cText}>
                        <Text style={baseStyles.h2}>Are you sure?</Text>
                        <Text style={baseStyles.h4}>Enter password to delete account</Text>
                    </View>
                    <InputField
                        name="password"
                        placeholder="Password"
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
    cButton: {
        alignItems: 'center',
    },
    cModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    wModal: {
        width: '85%',
        height: 450,
        backgroundColor: colors.background,
        borderColor: colors.border,
        borderWidth: 2,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cText: {
        alignItems: 'center',
    },
});
