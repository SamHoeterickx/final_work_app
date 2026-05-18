import { BackButton, Button, LoadingScreen } from '@/shared/components';
import { useStartLesson } from '@/shared/hooks';
import { baseStyles, colors, spacing } from '@/shared/styles/design.system';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LessonScreen() {
    const { uuid } = useLocalSearchParams();

    const { data: lesson, isPending } = useStartLesson({ lessonUuid: uuid as string });

    if (isPending) return <LoadingScreen />;

    const handleStartLesson = () => {
        console.log('start pressed');
    };

    return (
        <SafeAreaView style={styles.sLesson}>
            <Text style={[baseStyles.h2, styles.title]}>{lesson.name}</Text>

            <View style={styles.cButton}>
                <Button copy="Start les" onPress={handleStartLesson} />
            </View>
            <BackButton />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sLesson: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.background,
        paddingHorizontal: 25,
        paddingTop: spacing.xxl * 2,
        position: 'relative',
    },
    title: {
        textAlign: 'center',
    },
    cButton: {
        alignItems: 'center',
    },
});
