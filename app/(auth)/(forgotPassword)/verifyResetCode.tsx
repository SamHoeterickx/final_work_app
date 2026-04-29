import { BackButton, Button, InputField } from "@/shared/components";
import { useVerifyResetCode } from "@/shared/hooks/passwordReset/useVerifyResetCode.hook";
import { baseStyles } from "@/shared/styles/base.styles";
import { IVerifyResetCodeCredentials } from "@/shared/types/types";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function verifyResetCode(){
    const [formData, setFormData] = useState({
        resetCode: '',
    });

    const { email } = useLocalSearchParams();

    const { mutate, isError, error, isPending } = useVerifyResetCode();

    const handleFormInput = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleVerifyResetCode = () => {
        if(formData.resetCode === '') return
        const sanitizedEmail = Array.isArray(email) ? email[0] : email;        
        const inputData: IVerifyResetCodeCredentials = {
            ...formData,
           email: sanitizedEmail
        }
        mutate(inputData);
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
                            <Text style={[baseStyles.h2, styles.title]}>Verifieer je reset code</Text>
                            <Text style={[baseStyles.p, styles.description]}>We hebben een 8-cijferige code naar je e-mailadres gestuurd. Vul deze hieronder in.</Text>
                        </View>
                        <View style={styles.cForm}>
                            <View style={styles.wInputField}>
                                <Text style={[baseStyles.h4, styles.inputLabel]}>Reset Code</Text>
                                <InputField
                                    onChangeText={handleFormInput}
                                    name='resetCode'
                                    placeholder='reset code'
                                    autoCapitalize="none"
                                    spellCheck={false}
                                    maxLength={8}
                                    inputMode="decimal"
                                    style={{textAlign: 'center'}}
                                />
                            </View>
                            
                            {
                                isError && renderError()
                            }
                        </View>
                    </View>
                    <View style={baseStyles.cButton}>
                        <Button
                            copy='Verifieer reset code'
                            onPress={handleVerifyResetCode}
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