import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENTS
import { BackButton, Button, InputField } from '@/shared/components';

// HOOKS
import { useLogin } from '@/shared/hooks';

// STYLES
import { baseStyles, spacing } from '@/shared/styles/design.system';
import { ILoginCredentials } from '@/shared/types/types';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function LoginScreen() {
    const [formData, setFormData] = useState<ILoginCredentials>({
        email: '',
        password: ''
    });

    const { mutate, isPending, isError, error } = useLogin();

    const { t } = useTranslation();

    const handleFormInput = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleLogin = () => {
        mutate(formData);
    };

    const renderError = () => {
        return(
            <View>
                <Text style={[baseStyles.p, baseStyles.error]}>{error?.message}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1, position: 'relative' }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <Image
                        source={require('@/assets/logos/png/brewlingo_logo_black.png')}
                        style={styles.logo}
                        resizeMode='contain'
                    />
                    <View style={styles.cInputContent}>
                        <Text style={[baseStyles.h2, styles.title]}>{t('login.title')}</Text>
                        <View style={styles.cForm}>
                            <View style={styles.wInputField}>
                                <Text style={[baseStyles.h4, styles.inputLabel]}>{t('login.fieldLabels.email')}</Text>
                                <InputField
                                    onChangeText={handleFormInput}
                                    name='email'
                                    placeholder={t('login.fieldLabels.email')}
                                    autoCapitalize="none"
                                    spellCheck={false}
                                />
                            </View>
                            <View style={styles.wInputField}>
                                <Text style={[baseStyles.h4, styles.inputLabel]}>{t('login.fieldLabels.password')}</Text>
                                <InputField
                                    onChangeText={handleFormInput}
                                    name='password'
                                    placeholder={t('login.fieldLabels.password')}
                                    autoCapitalize="none"
                                    spellCheck={false}
                                    secureTextEntry={true}
                                />
                            </View>
                            {
                                isError && renderError()
                            }
                        </View>
                        <Link href={'/(auth)/(forgotPassword)/requestResetCode'} style={[baseStyles.p, styles.link]}>{t('login.buttons.forgotPassword')}</Link>
                    </View>
                    <View style={baseStyles.cButton}>
                        <Button
                            copy='login.buttons.login'
                            onPress={handleLogin}
                            disabled={isPending}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <BackButton />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: spacing.xl
    },
    logo: {
        width: '35%',
    },
    cForm: {
        width: '85%',
    },
    wInputField: {
        marginBottom: spacing.lg,
    },
    inputLabel: {
        marginBottom: spacing.sm,
    },
    scrollContent: {
        flexGrow: 1,
        width: '90%',
        marginHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cInputContent: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginTop: 64,
    },
    link: {
        fontSize: 12,
        color: 'blue',
        textDecorationLine: 'underline'
    }
})