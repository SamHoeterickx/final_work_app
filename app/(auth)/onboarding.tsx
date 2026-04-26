import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text>Welkom</Text>
            <Text>
                Register
            </Text>
            <Button title="login" onPress={() => router.replace('/(auth)/login')} />
        </SafeAreaView>
    );
}   