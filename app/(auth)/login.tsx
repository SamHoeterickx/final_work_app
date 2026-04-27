import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

// COMPONENTS
import { Button, InputField } from '@/shared/components';

// HOOKS
import { useLogin } from '@/shared/hooks';

// STYLES
import { baseStyles } from '@/shared/styles/base.styles';

export default function LoginScreen() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { mutate, isPending, isError, error } = useLogin();

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
        <SafeAreaView style={ [baseStyles.container] }>
            <Image
                source={require('@/assets/logos/png/brewlingo_logo_black.png')}
                style={styles.logo}
                resizeMode='contain'
            />
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
                {
                    isError && renderError()
                }
            </View>
            <View style={baseStyles.cButton}>
                <Button
                    copy='Login'
                    onPress={handleLogin}
                    disabled={isPending}
                />
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    cHeader: {
        width: '100%',
        flex: 1,
        alignItems: 'center'
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