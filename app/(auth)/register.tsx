import { BackButton, Button, InputField } from "@/shared/components";
import { refactorOnboardingSelection } from "@/shared/const/onboarding.const";
import { useOnboardingStore } from "@/shared/context/onboardingStore.context";
import { useRegister } from "@/shared/hooks/auth/useRegister.hook";
import { baseStyles, spacing } from "@/shared/styles/design.system";
import { IRegisterCredentials } from "@/shared/types/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register(){
    const [formData, setFormData] = useState<IRegisterCredentials>({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    });

    const { mutate, isError, error, isPending } = useRegister();
    const { answers } = useOnboardingStore();

    const { t } = useTranslation();

    const handleRegister = () => {
        if(formData.email === '' || formData.name === '' || formData.password === '' || formData.repeatPassword === '') return

        const sanitizedAnswers = refactorOnboardingSelection(answers);
        mutate({ credentials: formData, onboarding: sanitizedAnswers });
    }

    const handleFormInput = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const renderError = () => {
        return(
            <View>
                <Text style={[baseStyles.p, baseStyles.error]}>{error?.message}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, position: 'relative' }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
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
                            <Text style={[baseStyles.h2, styles.title]}>{t('register.title')}</Text>
                            <View style={styles.cForm}>
                                <View style={styles.wInputField}>
                                    <Text style={[baseStyles.h4, styles.inputLabel]}>{t('register.fieldLabels.name')}</Text>
                                    <InputField
                                        onChangeText={handleFormInput}
                                        name='name'
                                        placeholder={t('register.fieldLabels.name')}
                                        autoCapitalize="none"
                                        spellCheck={false}
                                    />
                                </View>
                                <View style={styles.wInputField}>
                                    <Text style={[baseStyles.h4, styles.inputLabel]}>{t('register.fieldLabels.email')}</Text>
                                    <InputField
                                        onChangeText={handleFormInput}
                                        name='email'
                                        placeholder={t('register.fieldLabels.email')}
                                        autoCapitalize="none"
                                        spellCheck={false}
                                    />
                                </View>
                                <View style={styles.wInputField}>
                                    <Text style={[baseStyles.h4, styles.inputLabel]}>{t('register.fieldLabels.password')}</Text>
                                    <InputField
                                        onChangeText={handleFormInput}
                                        name='password'
                                        placeholder={t('register.fieldLabels.password')}
                                        autoCapitalize="none"
                                        spellCheck={false}
                                        secureTextEntry={true}
                                    />
                                </View>
                                <View style={styles.wInputField}>
                                    <Text style={[baseStyles.h4, styles.inputLabel]}>{t('register.fieldLabels.repeatPassword')}</Text>
                                    <InputField
                                        onChangeText={handleFormInput}
                                        name='repeatPassword'
                                        placeholder={t('register.fieldLabels.repeatPassword')}
                                        autoCapitalize="none"
                                        spellCheck={false}
                                        secureTextEntry={true}
                                    />
                                </View>
                                {
                                    isError && renderError()
                                }
                            </View>
                        </View>
                        <View style={baseStyles.cButton}>
                            <Button
                                copy='register.buttons.register'
                                onPress={handleRegister}
                                disabled={isPending}
                            />
                        </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <BackButton />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '65%',
        marginBottom: spacing.xl,
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
    },

})