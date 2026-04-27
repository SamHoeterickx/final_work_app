import { Button } from '@/shared/components';
import { useLogin } from '@/shared/hooks';
import { baseStyles } from '@/shared/styles/base.styles';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const variables = {
    email: 'sam+2@mail.com',
    password: 'Test_2026',
};

export default function LoginScreen() {
    const { mutate, isPending, isError, error } = useLogin();
    const router = useRouter();

    const handleLogin = () => {
        mutate(variables, {
            onSuccess: () => {
                // Zodra het inloggen lukt, update de store (gebeurt in useLogin)
                // De _layout.tsx ziet de nieuwe token en stuurt je door naar (app)/home
            }
        });
    };

    const navigateLogin = () => {
        router.navigate('/(auth)/login')
    }

    return (
        <SafeAreaView style={ [baseStyles.container, styles.cLogin] }>
            <View style={ styles.cHeader}>
                <Image
                    style={ styles.logo }
                    source={require('@/assets/logos/png/brewlingo_logo_black.png')}
                    resizeMode='contain'
                />
            </View>
            <View>
                <TextInput placeholder='Email' />
                <TextInput placeholder='password' />
            </View>
            <View>
                <Button copy='Login' onPress={navigateLogin} styles={baseStyles.button} />
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    cLogin: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    }, 
    cHeader: {
        width: '100%',
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        width: '50%',
        maxWidth: 300,
    },
})