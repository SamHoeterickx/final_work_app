import { BackButton, Button, InputField } from "@/shared/components";
import { useChangePasswordWithResetCode } from "@/shared/hooks/passwordReset/useChangePasswordWithResetCode.hook";
import { baseStyles } from "@/shared/styles/base.styles";
import { IErrorData, INewPasswordCredentials } from "@/shared/types/types";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function resetPassword(){
    const [isPending, setIsPending] = useState<boolean>(false);
    const [formData, setFormData] = useState<INewPasswordCredentials>({
        newPassword: '',
        repeatNewPassword: '',
        oldPassword: null
    });
    const [errorData, setErrorData] = useState<IErrorData>({
        error: '',
        isError: false,
    });

    const { email, resetCode } = useLocalSearchParams<{ email?: string; resetCode?: string }>();
    
    const { mutate: mutateRC, isError: isErrorRC, error: errorRC, isPending: isPendingRC } = useChangePasswordWithResetCode();

    useEffect(() => {
        if(isErrorRC){
            setErrorData({
                error: errorRC?.message,
                isError: true
            });
        }else {
            setErrorData({
                error: '',
                isError: false
            });
        }
    }, [isErrorRC]);

    useEffect(() => {
        if(isPendingRC){
            setIsPending(true)
        }else {
            setIsPending(false);
        }
    }, [isPendingRC])
    

    const handleFormInput = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handlePasswordChange = () => {
        if(formData.newPassword === '' && formData.repeatNewPassword === '') return;
        const sanitizedEmail = Array.isArray(email) ? email[0] : email;        

        if(resetCode){
            mutateRC({
                resetCode: resetCode,
                email: sanitizedEmail,
                newPassword: formData.newPassword,
                repeatNewPassword: formData.repeatNewPassword
            })
        }else {
            if(formData.oldPassword === null) return
            // API UTILS GEBRUIKEN
            //authService.changePassword({
            //  
            //})
        }
    }

    const renderForgotPassword = () => {
        return (
            <>
                <View style={styles.wInputField}>
                    <Text style={[baseStyles.h4, styles.inputLabel]}>Nieuw Wachtwoord</Text>
                    <InputField
                        onChangeText={handleFormInput}
                        name='newPassword'
                        placeholder='nieuw wachtwoord'
                        autoCapitalize="none"
                        spellCheck={false}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.wInputField}>
                    <Text style={[baseStyles.h4, styles.inputLabel]}>Herhaal Nieuw Wachtwoord</Text>
                    <InputField
                        onChangeText={handleFormInput}
                        name='repeatNewPassword'
                        placeholder='herhaal nieuw wachtwoord'
                        autoCapitalize="none"
                        spellCheck={false}
                        secureTextEntry={true}
                    />
                </View>
            </>
        )
    }

    const renderChangePassword = () => {
        return (
            <>
                <View style={styles.wInputField}>
                    <Text style={[baseStyles.h4, styles.inputLabel]}>Oud Wachtwoord</Text>
                    <InputField
                        onChangeText={handleFormInput}
                        name='oldPassword'
                        placeholder='oud wachtwoord'
                        autoCapitalize="none"
                        spellCheck={false}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.wInputField}>
                    <Text style={[baseStyles.h4, styles.inputLabel]}>Nieuw Wachtwoord</Text>
                    <InputField
                        onChangeText={handleFormInput}
                        name='newPassword'
                        placeholder='nieuw wachtwoord'
                        autoCapitalize="none"
                        spellCheck={false}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.wInputField}>
                    <Text style={[baseStyles.h4, styles.inputLabel]}>Herhaal Nieuw Wachtwoord</Text>
                    <InputField
                        onChangeText={handleFormInput}
                        name='repeatNewPassword'
                        placeholder='herhaal nieuw wachtwoord'
                        autoCapitalize="none"
                        spellCheck={false}
                        secureTextEntry={true}
                    />
                </View>
                <Link href={'/(auth)/requestResetCode'} style={[baseStyles.p, styles.link]}>Wachtwoord vergeten</Link>
            </>
        )
    }

    const renderError = () => {
        return(
            <View>
                <Text style={[baseStyles.p, baseStyles.error]}>{errorData.error}</Text>
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
                            <Text style={[baseStyles.h2, styles.title]}>Kies een nieuw wachtwoord</Text>
                        </View>
                        <View style={styles.cForm}>
                            { resetCode ? renderForgotPassword() : renderChangePassword() }
                            { errorData.isError && renderError() }
                        </View>
                    </View>
                    <View style={baseStyles.cButton}>
                        <Button
                            copy='Verifieer reset code'
                            onPress={handlePasswordChange}
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