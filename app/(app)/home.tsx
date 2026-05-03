import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// STORE
import { useAuthStore } from '@/shared/context/authStore.context';

// GRAPHQL
import { GET_ALL_CHAPTERS } from '@/shared/graphql/query';

// UTILS
import { graphqlFetch } from '@/shared/utils/api.utils';
import { baseStyles } from '@/shared/styles/design.system';

export default function HomeScreen() {
    const [chapters, setChapters] = useState('');
    const logout = useAuthStore((state) => state.logout);
    const { t } = useTranslation();

    const getChapters = async () => {
        const response = await graphqlFetch(GET_ALL_CHAPTERS);
        setChapters(JSON.stringify(response, null, 2));
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[baseStyles.cHeader]}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Home</Text>
            </View>
            {/* <Button title="test chapters button" onPress={getChapters} />
            <Button title="Logout" onPress={logout} />

            <ScrollView>
                <Text>{chapters || 'No data yet'}</Text>
            </ScrollView> */}
        </SafeAreaView>
    );
}
