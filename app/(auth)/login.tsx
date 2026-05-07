import { Link } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENTS
import { BackButton, Button, InputField } from '@/shared/components';

// HOOKS
import { useLogin } from '@/shared/hooks';

// STYLES
import { baseStyles, spacing } from '@/shared/styles/design.system';

// TYPES
import { ILoginCredentials } from '@/shared/types/types';

export default function LoginScreen() {
    const [formData, setFormData] = useState<ILoginCredentials>({
        email: '',
        password: '',
    });

    const { mutate, isPending, isError, error } = useLogin();

    const { t } = useTranslation();

    const handleFormInput = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = () => {
        mutate(formData);
    };

    const renderError = () => {
        return (
            <View>
                <Text style={[baseStyles.p, baseStyles.error]}>{error?.message}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.cLogin}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={baseStyles.cScrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <Image
                        source={require('@/assets/logos/png/brewlingo_logo_v2.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <View style={baseStyles.cAuth}>
                        <Text style={[baseStyles.h2, styles.title]}>{t('login.title')}</Text>
                        <View style={styles.cForm}>
                            <View>
                                <Text style={[baseStyles.h4, styles.inputLabel]}>
                                    {t('login.fieldLabels.email')}
                                </Text>
                                <InputField
                                    onChangeText={handleFormInput}
                                    name="email"
                                    placeholder={t('login.fieldLabels.email')}
                                    autoCapitalize="none"
                                    spellCheck={false}
                                />
                            </View>
                            <View>
                                <Text style={[baseStyles.h4, styles.inputLabel]}>
                                    {t('login.fieldLabels.password')}
                                </Text>
                                <InputField
                                    onChangeText={handleFormInput}
                                    name="password"
                                    placeholder={t('login.fieldLabels.password')}
                                    autoCapitalize="none"
                                    spellCheck={false}
                                    secureTextEntry={true}
                                />
                            </View>
                            <Link
                                href={'/(auth)/(forgotPassword)/requestResetCode'}
                                style={[baseStyles.p, styles.link]}
                            >
                                {t('login.buttons.forgotPassword')}
                            </Link>
                            {isError && renderError()}
                        </View>
                    </View>
                    <View style={baseStyles.xlButton}>
                        <Button
                            copy="login.buttons.login"
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
    cLogin: {
        flex: 1, 
        position: 'relative',
        width: '100%' 
    },
    title: {
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '85%',
        marginBottom: spacing.xl,
    },
    logo: {
        width: '65%',
        marginTop: spacing.lg
    },
    cForm: {
        gap: spacing.md
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
    link: {
        fontSize: 12,
        color: 'blue',
        textDecorationLine: 'underline',
    },
});
