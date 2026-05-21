import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENETS
import {
    Button,
    LessonHeader,
    LessonScreenOptionsWrapper,
    LoadingScreen,
    PauseLessonModal,
    PostLessonFlow,
} from '@/shared/components';

// CONTEXT
import { useLessonStore } from '@/shared/context/lessonStore.context';

// HOOKS
import { useCompleteLesson, useStartLesson } from '@/shared/hooks';

// STYLES
import { colors } from '@/shared/styles/design.system';

// TYPES
import { ELocales, EPostLessonFlowOptions } from '@/shared/types/enums';

export default function LessonScreen() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [postFlowData, setPostFlowData] = useState<any | null>(null);
    const [postFlowCount, setPostFlowCount] = useState<number>(0);
    const [postFlowSteps, setPostFlowSteps] = useState<string[]>([]);
    const [subStep, setSubStep] = useState<number>(0);

    const { screenIndex, isLessonCompleted, setScreenIndex, setIsLessonCompleted } =
        useLessonStore();

    const { uuid } = useLocalSearchParams();
    const { i18n } = useTranslation();
    const router = useRouter();

    const { data: lesson, isPending: isPendingStart } = useStartLesson({
        lessonUuid: uuid as string,
        languageCode: i18n.language as ELocales,
    });
    const { mutate: completeLesson, isPending: isPendingComplete } = useCompleteLesson();

    useEffect(() => {
        setIsLessonCompleted(false);
    }, [uuid]);

    useEffect(() => {
        if (screenIndex === 0) {
            setSubStep(0);
        }
    }, [screenIndex]);

    if (!lesson) return;

    if (isPendingStart || isPendingComplete) return <LoadingScreen />;

    const handleButton = () => {
        if (isLessonCompleted) {
            if (postFlowSteps.length > 0) {
                if (postFlowCount < postFlowSteps.length - 1) {
                    setPostFlowCount((prev) => prev + 1);
                } else {
                    router.replace('/(app)/home');
                }
            }
            return;
        }

        if (!lesson?.content?.[0]?.content) return;

        const content = lesson.content[0].content;
        const currentScreen = content[screenIndex];
        const bodyArray = Array.isArray(currentScreen.body)
            ? currentScreen.body
            : [currentScreen.body];

        if (subStep < bodyArray.length - 1) {
            setSubStep(subStep + 1);
            return;
        }

        if (screenIndex >= content.length - 1) {
            if (!isLessonCompleted) {
                setIsLessonCompleted(true);
                completeLesson(
                    {
                        lessonUuid: uuid as string,
                        languageCode: i18n.language as ELocales,
                    },
                    {
                        onSuccess: (responseData) => {
                            const steps: string[] = [];
                            if (responseData?.newUserXP !== responseData?.prevUserXP) {
                                steps.push(EPostLessonFlowOptions.SHOW_XP);
                            }

                            if (responseData?.newStreak > responseData?.prevStreak) {
                                steps.push(EPostLessonFlowOptions.SHOW_STREAK);
                            }

                            if (responseData?.newUnlockedChapter) {
                                steps.push(EPostLessonFlowOptions.SHOW_UNLOCKED_CHAPTER);
                            }

                            if (responseData?.newUnlockedLesson) {
                                steps.push(EPostLessonFlowOptions.SHOW_UNLOCKED_LESSON);
                            }

                            setPostFlowSteps(steps);
                            setPostFlowData(responseData);
                        },
                    },
                );
            }
            return;
        }

        setSubStep(0);
        setScreenIndex(screenIndex + 1);
    };

    const handleBack = () => {
        if (isLessonCompleted) {
            if (postFlowCount > 0) {
                setPostFlowCount((prev) => prev - 1);
            }
            return;
        }

        if (subStep > 0) {
            setSubStep(subStep - 1);
            return;
        }

        if (screenIndex > 0) {
            const prevScreenIndex = screenIndex - 1;
            const previousScreen = lesson?.content?.[0]?.content?.[prevScreenIndex];
            const bodyArray = Array.isArray(previousScreen?.body)
                ? previousScreen.body
                : [previousScreen?.body];

            setSubStep(bodyArray.length > 0 ? bodyArray.length - 1 : 0);
            setScreenIndex(prevScreenIndex);
            return;
        }

        router.back();
    };

    const renderButtonCopy = () => {
        if (isLessonCompleted) {
            return 'lesson.buttons.continue';
        }

        const currentScreen = lesson.content?.[0].content?.[screenIndex];
        const bodyArray = Array.isArray(currentScreen?.body)
            ? currentScreen.body
            : [currentScreen?.body];
        const isLastScreen = screenIndex >= lesson.content[0].content.length - 1;
        const isLastSubStep = subStep >= bodyArray.length - 1;

        if (isLastScreen && isLastSubStep) {
            return 'lesson.buttons.complete';
        }
        return 'lesson.buttons.continue';
    };

    return (
        <SafeAreaView style={styles.sLesson}>
            <LessonHeader
                screenCount={screenIndex}
                totalScreens={lesson.content[0].content.length - 1}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onBackPress={handleBack}
            />

            {!isLessonCompleted && (
                <LessonScreenOptionsWrapper
                    key={screenIndex}
                    screenType={lesson.content[0].content[screenIndex].screenType}
                    lessonContent={lesson.content[0].content[screenIndex]}
                    subStep={subStep}
                />
            )}

            {isLessonCompleted && !postFlowData && <LoadingScreen />}
            {postFlowData && !isPendingComplete && (
                <PostLessonFlow data={postFlowData} currentStep={postFlowSteps[postFlowCount]} />
            )}

            <PauseLessonModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

            {(!isLessonCompleted || postFlowData) && (
                <View style={styles.cButton}>
                    <Button copy={renderButtonCopy()} onPress={handleButton} />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sLesson: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.background,
        paddingHorizontal: 25,
    },
    cButton: {
        alignItems: 'center',
        zIndex: 10,
    },
});
