import { colors } from '@/shared/styles/design.system';
import { Stack } from 'expo-router';

export default function AppLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.background },
            }}
        >
            <Stack.Screen name="home" />
        </Stack>
    );
}
