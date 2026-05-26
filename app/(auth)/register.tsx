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

// CONST
import { refactorOnboardingSelection } from '@/shared/const/onboarding.const';

// STORE
import { useOnboardingStore } from '@/shared/context/onboardingStore.context';

// HOOKS
import { useRegister } from '@/shared/hooks';

// STYLES
import { baseStyles, spacing } from '@/shared/styles/design.system';

// TYPES
import { IRegisterCredentials } from '@/shared/types/types';

export default function Register() {
    const [formData, setFormData] = useState<IRegisterCredentials>({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
    });

    const { mutate, isError, error, isPending } = useRegister();
    const { answers } = useOnboardingStore();

    const { t } = useTranslation();

    const handleRegister = () => {
        if (
            formData.email === '' ||
            formData.name === '' ||
            formData.password === '' ||
            formData.repeatPassword === ''
        )
            return;

        const sanitizedAnswers = refactorOnboardingSelection(answers);
        mutate({ credentials: formData, onboarding: sanitizedAnswers });
    };

    const handleFormInput = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const renderError = () => {
        return (
            <View>
                <Text style={[baseStyles.p, baseStyles.errorText]}>{error?.message}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.cRegister}>
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
                        style={baseStyles.logo}
                        resizeMode="contain"
                    />
                    <View style={baseStyles.cAuth}>
                        <Text style={[baseStyles.h2, styles.title]}>{t('register.title')}</Text>
                        <View style={styles.cForm}>
                            <View>
                                <Text style={[baseStyles.h4, styles.inputLabel]}>
                                    {t('register.fieldLabels.name')}
                                </Text>
                                <InputField
                                    onChangeText={handleFormInput}
                                    name="name"
                                    placeholder={t('register.fieldLabels.name')}
                                    autoCapitalize="none"
                                    spellCheck={false}
                                />
                            </View>
                            <View>
                                <Text style={[baseStyles.h4, styles.inputLabel]}>
                                    {t('register.fieldLabels.email')}
                                </Text>
                                <InputField
                                    onChangeText={handleFormInput}
                                    name="email"
                                    placeholder={t('register.fieldLabels.email')}
                                    autoCapitalize="none"
                                    spellCheck={false}
                                />
                            </View>
                            <View>
                                <Text style={[baseStyles.h4, styles.inputLabel]}>
                                    {t('register.fieldLabels.password')}
                                </Text>
                                <InputField
                                    onChangeText={handleFormInput}
                                    name="password"
                                    placeholder={t('register.fieldLabels.password')}
                                    autoCapitalize="none"
                                    spellCheck={false}
                                    secureTextEntry={true}
                                />
                            </View>
                            <View>
                                <Text style={[baseStyles.h4, styles.inputLabel]}>
                                    {t('register.fieldLabels.repeatPassword')}
                                </Text>
                                <InputField
                                    onChangeText={handleFormInput}
                                    name="repeatPassword"
                                    placeholder={t('register.fieldLabels.repeatPassword')}
                                    autoCapitalize="none"
                                    spellCheck={false}
                                    secureTextEntry={true}
                                />
                            </View>
                            {isError && renderError()}
                        </View>
                    </View>
                    <View style={baseStyles.xlButton}>
                        <Button
                            copy="register.buttons.register"
                            onPress={handleRegister}
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
    cRegister: {
        flex: 1,
        position: 'relative',
        width: '100%',
    },
    title: {
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: spacing.xl,
    },
    cForm: {
        gap: spacing.md,
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
});
