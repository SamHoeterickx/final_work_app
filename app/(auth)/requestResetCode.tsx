import { BackButton, Button, InputField } from "@/shared/components";
import { useRequestResetCode } from "@/shared/hooks/passwordReset/useRequestResetCode.hook";
import { baseStyles } from "@/shared/styles/base.styles";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function requestResetCode(){
    const [formData, setFormData] = useState({
        email: '',
    });

    const { mutate, isError, error, isPending } = useRequestResetCode()

    const handleFormInput = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleRequestResetCode = () => {
        if(formData.email === '') return

        mutate(formData);
    }

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
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={{ flex: 1,  position: 'relative' }}
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
                        <View style={styles.cText}>
                            <Text style={[baseStyles.h2, styles.title]}>Wachtwoord vergeten</Text>
                            <Text style={[baseStyles.p, styles.description]}>Vul je e-mailadres in en we sturen je een code om je wachtwoord opnieuw in te stellen.</Text>
                        </View>
                        <View style={styles.cForm}>
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
                            
                            {
                                isError && renderError()
                            }
                        </View>
                    </View>
                    <View style={baseStyles.cButton}>
                        <Button
                            copy='Reset code aanvragen'
                            onPress={handleRequestResetCode}
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
    cText: {
        marginBottom: 32,
        alignItems: 'center',
        textAlign: 'center',
    },
    title: {
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 26,
    },
    description: {
        textAlign: 'center',
        marginTop: 12,
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