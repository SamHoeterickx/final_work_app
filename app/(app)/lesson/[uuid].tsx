import { BackButton, Button, LoadingScreen } from '@/shared/components';
import { useStartLesson } from '@/shared/hooks';
import { baseStyles, colors, spacing } from '@/shared/styles/design.system';
import { ELocales } from '@/shared/types/enums';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LessonScreen() {

    const { uuid } = useLocalSearchParams();
    const { i18n } = useTranslation();

    const { data: lesson, isPending } = useStartLesson({ 
        lessonUuid: uuid as string,
        languageCode: i18n.language as ELocales
    });

    if (isPending) return <LoadingScreen />;

    const handleStartLesson = () => {
        console.log('start pressed');
    };

    return (
        <SafeAreaView style={styles.sLesson}>
            <Text style={[baseStyles.h2, styles.title]}>{lesson?.content[0].name}</Text>

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
