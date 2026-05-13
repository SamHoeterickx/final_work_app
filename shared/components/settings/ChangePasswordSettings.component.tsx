import { Link, useRouter } from 'expo-router';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

// COMPONENTS
import { Button, InputField } from '@/shared/components';

// HOOKS
import { useChangePassword, useChangePasswordWithResetCode } from '@/shared/hooks';

// STYLES
import { baseStyles, spacing } from '@/shared/styles/design.system';

// TYPES
import {
    IChangePasswordSettingsProps,
    IErrorData,
    INewPasswordCredentials,
} from '@/shared/types/types';

export const ChangePasswordSettings: FC<IChangePasswordSettingsProps> = ({ resetCode, email }) => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [formData, setFormData] = useState<INewPasswordCredentials>({
        newPassword: '',
        repeatNewPassword: '',
        oldPassword: null,
    });
    const [errorData, setErrorData] = useState<IErrorData>({
        error: '',
        isError: false,
    });

    const { t } = useTranslation();

    const router = useRouter();

    const {
        mutate: mutateRC,
        isError: isErrorRC,
        error: errorRC,
        isPending: isPendingRC,
    } = useChangePasswordWithResetCode();

    const {
        mutate: mutatePC,
        isError: isErrorPC,
        error: errorPC,
        isPending: isPendingPC,
    } = useChangePassword();

    useEffect(() => {
        if (isErrorRC) {
            setErrorData({
                error: errorRC?.message,
                isError: true,
            });
        } else if(isErrorPC) {
            setErrorData({
                error: errorPC?.message,
                isError: true,
            });
        } else  {
            setErrorData({
                error: '',
                isError: false,
            });
        }
    }, [isErrorRC, errorRC]);

    useEffect(() => {
        if(isPendingRC){
            setIsPending(isPendingRC);
        }else if (isPendingPC){
            setIsPending(isPendingPC);
        }else {
            setIsPending(false);
        }
    }, [isPendingRC, isPendingPC]);

    const handleFormInput = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePasswordChange = () => {
        if (formData.newPassword === '' && formData.repeatNewPassword === '') return;

        if (resetCode && email) {
            mutateRC({
                resetCode: resetCode,
                email: email,
                newPassword: formData.newPassword,
                repeatNewPassword: formData.repeatNewPassword,
            });
        } else {
            if (formData.oldPassword === null) return;
            mutatePC({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
                repeatNewPassword: formData.repeatNewPassword,
            },{
                onSuccess: () => {
                    router.back();
                }
            })
        }
    };

    const renderError = () => {
        if (!errorData.isError) return null;
        return (
            <View>
                <Text style={[baseStyles.p, baseStyles.error]}>{errorData.error}</Text>
            </View>
        );
    };

    const renderResetPasswordWithRC = () => (
        <>
            <View style={styles.wInputField}>
                <Text style={[baseStyles.h4, styles.inputLabel]}>
                    {t('resetPassword.fieldLabels.newPassword')}
                </Text>
                <InputField
                    onChangeText={handleFormInput}
                    name="newPassword"
                    placeholder={t('resetPassword.fieldLabels.newPassword')}
                    autoCapitalize="none"
                    spellCheck={false}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.wInputField}>
                <Text style={[baseStyles.h4, styles.inputLabel]}>
                    {t('resetPassword.fieldLabels.repeatNewPassword')}
                </Text>
                <InputField
                    onChangeText={handleFormInput}
                    name="repeatNewPassword"
                    placeholder={t('resetPassword.fieldLabels.repeatNewPassword')}
                    autoCapitalize="none"
                    spellCheck={false}
                    secureTextEntry={true}
                />
            </View>
        </>
    )

    const renderResetPassword = () => (
        <>
            <View style={styles.wInputField}>
                <Text style={[baseStyles.h4, styles.inputLabel]}>
                    {t('resetPassword.fieldLabels.oldPassword')}
                </Text>
                <InputField
                    onChangeText={handleFormInput}
                    name="oldPassword"
                    placeholder={t('resetPassword.fieldLabels.oldPassword')}
                    autoCapitalize="none"
                    spellCheck={false}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.wInputField}>
                <Text style={[baseStyles.h4, styles.inputLabel]}>
                    {t('resetPassword.fieldLabels.newPassword')}
                </Text>
                <InputField
                    onChangeText={handleFormInput}
                    name="newPassword"
                    placeholder={t('resetPassword.fieldLabels.newPassword')}
                    autoCapitalize="none"
                    spellCheck={false}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.wInputField}>
                <Text style={[baseStyles.h4, styles.inputLabel]}>
                    {t('resetPassword.fieldLabels.repeatNewPassword')}
                </Text>
                <InputField
                    onChangeText={handleFormInput}
                    name="repeatNewPassword"
                    placeholder={t('resetPassword.fieldLabels.repeatNewPassword')}
                    autoCapitalize="none"
                    spellCheck={false}
                    secureTextEntry={true}
                />
            </View>
            <Link
                href={'/(auth)/(forgotPassword)/requestResetCode'}
                style={[baseStyles.p, styles.link]}
            >
                {t('resetPassword.buttons.forgotPassword')}
            </Link>
        </>
    )

    return (
        <View style={styles.container}>
            <View>
                {resetCode ? renderResetPasswordWithRC() : renderResetPassword()}
                {renderError()}
            </View>

            <View style={styles.cButton}>
                <Button
                    copy="resetPassword.buttons.resetPassword"
                    onPress={handlePasswordChange}
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
    link: {
        fontSize: 12,
        color: 'blue',
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
    cButton: {
        alignItems: 'center',
        marginTop: spacing.xxl,
    },
});
