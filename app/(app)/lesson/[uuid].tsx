import { Button, LessonHeader, LessonScreenOptionsWrapper, LoadingScreen } from '@/shared/components';
import { PauseLessonModal } from '@/shared/components/modal/PauseLessonModal.component';
import { useLessonStore } from '@/shared/context/lessonStore.context';
import { useStartLesson } from '@/shared/hooks';
import { colors, } from '@/shared/styles/design.system';
import { ELessonScreenOptions, ELocales } from '@/shared/types/enums';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LessonScreen() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [subStep, setSubStep] = useState<number>(0);

    const { screenIndex, isLessonCompleted, setScreenIndex, setIsLessonCompleted } = useLessonStore();

    const { uuid } = useLocalSearchParams();
    const { i18n } = useTranslation();
    const router = useRouter();

    const { data: lesson, isPending } = useStartLesson({ 
        lessonUuid: uuid as string,
        languageCode: i18n.language as ELocales
    });

    useEffect(() => {
        setIsLessonCompleted(false)
    }, [uuid]);

    if(!lesson) return;

    if (isPending) return <LoadingScreen />;

    const handleStartLesson = () => {
        if(!lesson || !lesson.content || !lesson.content?.[0] || !lesson.content?.[0].content) return

        const currentScreen = lesson.content?.[0].content?.[screenIndex];
        
        if (currentScreen?.screenType === ELessonScreenOptions.C_TEXT_WITH_IMAGE) {
            const bodyArray = Array.isArray(currentScreen.body) ? currentScreen.body : [currentScreen.body];
            if (subStep < bodyArray.length - 1) {
                setSubStep(subStep + 1);
                return;
            }
        }

        setSubStep(0);
        if(!isLessonCompleted){
            setScreenIndex(screenIndex + 1)
        }

        if(screenIndex === lesson.content[0].content.length - 1) {
            setIsLessonCompleted(true);
        }
    };

    const handleBack = () => {
        const currentScreen = lesson?.content?.[0]?.content?.[screenIndex];
        
        if (currentScreen?.screenType === ELessonScreenOptions.C_TEXT_WITH_IMAGE && subStep > 0) {
            setSubStep(subStep - 1);
            return;
        }

        if(isLessonCompleted){
            setIsLessonCompleted(false);
        }

        if (screenIndex > 0) {
            const prevScreenIndex = screenIndex - 1;
            const previousScreen = lesson?.content?.[0]?.content?.[prevScreenIndex];

            if (previousScreen?.screenType === ELessonScreenOptions.C_TEXT_WITH_IMAGE) {
                const bodyArray = Array.isArray(previousScreen.body) ? previousScreen.body : [previousScreen.body];
                setSubStep(bodyArray.length - 1);
            } else {
                setSubStep(0);
            }
            setScreenIndex(prevScreenIndex);
            return;
        }

        router.back();
    };

    const renderButtonCopy = () => {
        if(!isLessonCompleted) {
            const currentScreen = lesson.content?.[0].content?.[screenIndex];

            const bodyArray = Array.isArray(currentScreen.body) ? currentScreen.body : [currentScreen.body];
            const isLastScreen = screenIndex === lesson.content[0].content.length - 1;
            const isLastSubStep = subStep === bodyArray.length - 1;

            if (isLastScreen && isLastSubStep) {
                return 'lesson.buttons.complete'
            }
        }
        return 'lesson.buttons.continue'
    }

    return (
        <SafeAreaView style={styles.sLesson}>
            <LessonHeader
                screenCount={screenIndex}
                totalScreens={lesson.content[0].content.length}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onBackPress={handleBack}
            />

            { !isLessonCompleted &&  (
                <LessonScreenOptionsWrapper 
                    screenType={lesson.content[0].content[screenIndex].screenType} 
                    lessonContent={lesson.content[0].content[screenIndex]}
                    subStep={subStep}
                />   
            )}

            { isLessonCompleted && <Text>GOOD JOB</Text>}

            <PauseLessonModal 
                isModalOpen={isModalOpen} 
                setIsModalOpen={setIsModalOpen}
            />

            <View style={styles.cButton}>
                <Button copy={renderButtonCopy()} onPress={handleStartLesson} />
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
