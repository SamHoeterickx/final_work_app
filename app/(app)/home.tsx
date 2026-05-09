// import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Button, ScrollView} from 'react-native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// STORE
// import { useAuthStore } from '@/shared/context/authStore.context';

import { useGetChapters } from '@/shared/hooks';
import { baseStyles } from '@/shared/styles/design.system';
import { useEffect } from 'react';

export default function HomeScreen() {
    const { data: chapters, isPending, isError, error } = useGetChapters();

    useEffect(() => {
        console.log(chapters);
    }, [chapters]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[baseStyles.cHeader]}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Home</Text>
            </View>
        </SafeAreaView>
    );
}
