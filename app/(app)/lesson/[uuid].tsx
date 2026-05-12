import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LessonScreen() {
    const { uuid } = useLocalSearchParams();

    return (
        <SafeAreaView>
            <Text>LESSONSCREEN WITH UUID</Text>
            <Text>{uuid}</Text>
        </SafeAreaView>
    );
}
