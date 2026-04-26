import { useLogin } from '@/shared/hooks';
import { useRouter } from 'expo-router';
import { Button, Text, TextInput } from 'react-native';
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

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Login</Text>
            <TextInput
                placeholder='email'
            />
            <TextInput
                placeholder='password'
            />
            {isPending ? (
                <Text>Loading...</Text>
            ) : (
                <Button title="Login" onPress={handleLogin} />
            )}
            {isError && <Text style={{ color: 'red' }}>{error.message}</Text>}
            
            <Button 
                title="Register" 
                onPress={() => router.push('/(auth)/onboarding')} 
            />
        </SafeAreaView>
    );
}