import { useAuthStore } from '@/shared/context/authStore.context';
import { GET_ALL_CHAPTERS } from '@/shared/graphql/query';
import { graphqlFetch } from '@/shared/utils/api.utils';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const [chapters, setChapters] = useState('');
    const logout = useAuthStore((state) => state.logout);
    const { t } = useTranslation();

    const getChapters = async () => {
        const response = await graphqlFetch(GET_ALL_CHAPTERS);
        setChapters(JSON.stringify(response, null, 2));
    };

    return (
        <SafeAreaView style={{ flex: 1}}>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{t('home.title')}</Text>
            <Button title="test chapters button" onPress={getChapters} />
            <Button title="Logout" onPress={logout} />
            
            <ScrollView >
                <Text>{chapters || "No data yet"}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}