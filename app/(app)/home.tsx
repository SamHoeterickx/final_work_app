import { useState } from 'react';
import { Button, Text, View, ScrollView } from 'react-native';
import { graphqlFetch } from '@/shared/utils/api.utils';
import { GET_ALL_CHAPTERS } from '@/shared/graphql/query';
import { useAuthStore } from '@/shared/context/authStore.context';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const [chapters, setChapters] = useState('');
    const logout = useAuthStore((state) => state.logout);

    const getChapters = async () => {
        const response = await graphqlFetch(GET_ALL_CHAPTERS);
        setChapters(JSON.stringify(response, null, 2));
    };

    return (
        <SafeAreaView style={{ flex: 1}}>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>HOME ISLAND</Text>
            <Button title="test chapters button" onPress={getChapters} />
            
            <ScrollView >
                <Text>{chapters || "No data yet"}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}