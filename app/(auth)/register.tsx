import { Button, InputField } from "@/shared/components";
import { refactorOnboardingSelection } from "@/shared/const/onboarding.const";
import { useOnboardingStore } from "@/shared/context/onboardingStore.context";
import { useRegister } from "@/shared/hooks/auth/useRegister.hook";
import { baseStyles } from "@/shared/styles/base.styles";
import { IRegisterCredentials } from "@/shared/types/types";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
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

    const handleRegister = () => {
        console.log(formData);
        const sanitizedAnswers = refactorOnboardingSelection(answers);
        console.log(sanitizedAnswers)
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
        <SafeAreaView style={baseStyles.container}>
            <Image
                source={require('@/assets/logos/png/brewlingo_logo_black.png')}
                style={styles.logo}
                resizeMode='contain'
            />
            <Text style={[baseStyles.h2, styles.title]}>Registreer</Text>
            <View style={styles.cForm}>
                <View style={styles.wInputField}>
                    <Text style={[baseStyles.h4, styles.inputLabel]}>Naam</Text>
                    <InputField
                        onChangeText={handleFormInput}
                        name='name'
                        placeholder='naam'
                        autoCapitalize="none"
                        spellCheck={false}
                    />
                </View>
                <View style={styles.wInputField}>
                    <Text style={[baseStyles.h4, styles.inputLabel]}>Email</Text>
                    <InputField
                        onChangeText={handleFormInput}
                        name='email'
                        placeholder='email'
                        autoCapitalize="none"
                        spellCheck={false}
                    />
                </View>
                <View style={styles.wInputField}>
                    <Text style={[baseStyles.h4, styles.inputLabel]}>Wachtwoord</Text>
                    <InputField
                        onChangeText={handleFormInput}
                        name='password'
                        placeholder='wachtwoord'
                        autoCapitalize="none"
                        spellCheck={false}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.wInputField}>
                    <Text style={[baseStyles.h4, styles.inputLabel]}>Herhaal Wachtwoord</Text>
                    <InputField
                        onChangeText={handleFormInput}
                        name='repeatPassword'
                        placeholder='herhaal wachtwoord'
                        autoCapitalize="none"
                        spellCheck={false}
                        secureTextEntry={true}
                    />
                </View>
                {
                    isError && renderError()
                }
            </View>
            <View style={baseStyles.cButton}>
                <Button
                    copy='Registreer'
                    onPress={handleRegister}
                    disabled={isPending}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 26,
    },
    logo: {
        width: '35%',
    },
    cForm: {
        width: '85%',
    },
    wInputField: {
        marginBottom: 24,
    },
    inputLabel: {
        marginBottom: 12,
    }
})