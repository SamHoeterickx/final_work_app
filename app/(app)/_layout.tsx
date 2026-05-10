import { colors } from '@/shared/styles/design.system';
import { Tabs } from 'expo-router';

export default function AppLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#FFF',
                    borderTopWidth: 0,
                    elevation: 0,
                    margin: 0,
                    padding: 0
                },
            }}
        >
            <Tabs.Screen name="home" />
        </Tabs>
    );
}
