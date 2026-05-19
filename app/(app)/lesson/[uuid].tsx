import { Button, LessonHeader, LessonScreenOptionsWrapper, LoadingScreen } from '@/shared/components';
import { PauseLessonModal } from '@/shared/components/modal/PauseLessonModal.component';
import { useLessonStore } from '@/shared/context/lessonStore.context';
import { useStartLesson } from '@/shared/hooks';
import { colors, } from '@/shared/styles/design.system';
import { ELocales } from '@/shared/types/enums';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LessonScreen() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { screenIndex, setScreenIndex } = useLessonStore();

    const { uuid } = useLocalSearchParams();
    const { i18n } = useTranslation();

    const { data: lesson, isPending } = useStartLesson({ 
        lessonUuid: uuid as string,
        languageCode: i18n.language as ELocales
    });

    if(!lesson) return;

    if (isPending) return <LoadingScreen />;

    const handleStartLesson = () => {
        console.log('start pressed');
        setScreenIndex(screenIndex + 1);
    };

    return (
        <SafeAreaView style={styles.sLesson}>
            <LessonHeader
                screenCount={screenIndex}
                totalScreens={lesson.content[0].content.length}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />

            <LessonScreenOptionsWrapper 
                screenType={lesson.content[0].content[screenIndex].screenType} 
                lessonContent={lesson.content[0].content[screenIndex]}
            />    

            <PauseLessonModal 
                isModalOpen={isModalOpen} 
                setIsModalOpen={setIsModalOpen}
            />

            <View style={styles.cButton}>
                <Button copy="lesson.buttons.continue" onPress={handleStartLesson} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sLesson: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.background,
        paddingHorizontal: 25,
        // position: 'relative',
    },
    title: {
        textAlign: 'center',
    },
    cButton: {
        alignItems: 'center',
    },
});
