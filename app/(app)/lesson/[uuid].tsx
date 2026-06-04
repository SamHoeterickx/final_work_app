import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
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

// CONST
import { LOADING_MESSAGE_KEYS } from '@/shared/const/loadingScreen.const';

// STYLES
import { colors } from '@/shared/styles/design.system';

// TYPES
import { ELocales, EPostLessonFlowOptions } from '@/shared/types/enums';

const TEST_LESSON_CONTENT = [
    {
        screen: 1,
        type: 'info',
        screenType: 'C_TITLE',
        title: 'De Kracht van Stoom',
        body: 'Water dat omhoog stroomt tegen de zwaartekracht in? Tijd om de natuurkunde achter de moka pot te ontrafelen.',
    },
    {
        screen: 2,
        type: 'info',
        screenType: 'C_TEXT_WITH_IMAGE',
        imgPath: '${lesson_uuid}_moka_anatomy',
        title: 'De Drie Kamers',
        body: [
            'Een moka pot bestaat uit drie cruciale basisonderdelen: het ***onderste reservoir*** voor het water, de ***trechtervormige filter*** voor de koffie, en de ***bovenste opvangkamer***.',
            'Zodra je het potje op een warmtebron zet, begint het water onderin op te warmen en verandert een klein deel in ***stoom***.',
        ],
    },
    {
        screen: 3,
        type: 'info',
        screenType: 'C_ONLY_TEXT',
        title: 'De Wetenschap achter de Stijgbuis',
        body: [
            'De opgebouwde stoom heeft steeds minder ruimte en begint hard te drukken op het wateroppervlak. Deze ***stoomdruk*** perst het hete water naar beneden.',
            'Omdat het water nergens anders heen kan, wordt het via de ***stijgbuis*** van de trechter loodrecht omhoog geduwd.',
            'Het water stroomt zo op een constante manier ***dóór het koffiebed*** heen, om vervolgens via het bovenste pijpje kant-en-klaar in de opvangkamer te borrelen.',
        ],
    },
    {
        screen: 4,
        type: 'video',
        screenType: 'C_VIDEO',
        title: 'Werking van de mokapot',
        path: 'moka_pot_explained',
    },
    {
        screen: 5,
        type: 'info',
        screenType: 'C_ONLY_TEXT',
        title: 'De Espresso Mythe',
        body: [
            'Hoewel de moka pot in Italië de *Moka Express* wordt genoemd, maakt hij technisch gezien ***geen echte espresso***.',
            'Een professionele espressocultuur eist een druk van minimaal ***9 bar*** om oliën te emulgeren tot die typische dikke cremalaag.',
            'Een moka pot werkt puur op natuurlijke stoomdruk en bereikt maximaal ***1,5 bar***. Het resultaat is een unieke categorie: een zeer intense, volle koffie die tussen filterkoffie en espresso in zit.',
        ],
    },
    {
        screen: 6,
        type: 'quiz',
        screenType: 'Q_RIGHT_OR_WRONG',
        title: 'Kennischeck: Het Mechanisme',
        question:
            'Wat zorgt ervoor dat het water in een moka pot tegen de zwaartekracht in door de koffie heen omhoog wordt geduwd?',
        answer: 'De stoomdruk die zich opbouwt in het onderste reservoir.',
        options: [
            'De stoomdruk die zich opbouwt in het onderste reservoir.',
            'Een kleine, ingebouwde elektrische pomp in de hendel.',
            'De magnetische straling van het aluminium.',
        ],
    },
    {
        screen: 7,
        type: 'quiz',
        screenType: 'Q_RIGHT_OR_WRONG',
        title: 'Kennischeck: De Druk',
        question: 'Maakt een moka pot technisch gezien echte espresso zoals in een koffiebar?',
        answer: 'Nee, want hij haalt maximaal 1,5 bar druk, terwijl een espressomachine minstens 9 bar nodig heeft.',
        options: [
            'Ja, de druk en de resulterende koffie zijn exact identiek.',
            'Nee, want hij haalt maximaal 1,5 bar druk, terwijl een espressomachine minstens 9 bar nodig heeft.',
        ],
    },
];

export default function LessonScreen() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [postFlowData, setPostFlowData] = useState<any | null>(null);
    const [postFlowCount, setPostFlowCount] = useState<number>(0);
    const [postFlowSteps, setPostFlowSteps] = useState<string[]>([]);

    const isNavigatingBack = useRef(false);

    const screenIndex = useLessonStore((state) => state.screenIndex);
    const isLessonCompleted = useLessonStore((state) => state.isLessonCompleted);
    const subStep = useLessonStore((state) => state.subStep || 0);
    const selectedOption = useLessonStore((state) => state.selectedOption || null);

    const setScreenIndex = useLessonStore((state) => state.setScreenIndex);
    const setIsLessonCompleted = useLessonStore((state) => state.setIsLessonCompleted);
    const setSubStep = useLessonStore((state) => state.setSubStep);
    const setSelectedOption = useLessonStore((state) => state.setSelectedOption);
    const setQuizError = useLessonStore((state) => state.setQuizError);

    const { uuid } = useLocalSearchParams();
    const { i18n, t } = useTranslation();
    const router = useRouter();

    const { data: lesson, isPending: isPendingStart } = useStartLesson({
        lessonUuid: uuid as string,
        languageCode: i18n.language as ELocales,
    });
    const { mutate: completeLesson, isPending: isPendingComplete } = useCompleteLesson();

    useFocusEffect(
        useCallback(() => {
            setIsLessonCompleted(false);
            setScreenIndex(0);
            setSubStep(0);
            setPostFlowCount(0);
            setPostFlowSteps([]);
            setPostFlowData(null);
            isNavigatingBack.current = false;
        }, [uuid]),
    );

    useEffect(() => {
        if (screenIndex === 0 && !isNavigatingBack.current) {
            setSubStep(0);
        }
        isNavigatingBack.current = false;
        setSelectedOption(null);
        setQuizError(null);
    }, [screenIndex]);

    if (!lesson) return;
    if (isPendingStart || isPendingComplete)
        return <LoadingScreen message={LOADING_MESSAGE_KEYS.PREPARING_APP} />;

    const currentScreen = TEST_LESSON_CONTENT[screenIndex];
    const isQuizScreen =
        currentScreen?.screenType?.startsWith('Q_') || currentScreen?.type === 'quiz';

    const handleButton = () => {
        if (isLessonCompleted) {
            if (postFlowSteps.length > 0) {
                if (postFlowCount < postFlowSteps.length - 1) {
                    setPostFlowCount((prev) => prev + 1);
                } else {
                    router.replace('/(app)/home');
                }
            } else {
                router.replace('/(app)/home');
            }
            return;
        }

        if (!TEST_LESSON_CONTENT) return;

        if (isQuizScreen) {
            if (!selectedOption) return;

            const isCorrect =
                selectedOption === currentScreen.answer || selectedOption === 'MATCHED_ALL';

            if (!isCorrect) {
                setQuizError(t('lesson.quiz.wrongAnswer', 'Fout, probeer nog eens'));
                return;
            }
            setQuizError(null);
        }

        const content = TEST_LESSON_CONTENT;
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

                            if (
                                responseData &&
                                responseData?.newStreak > responseData?.prevStreak
                            ) {
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
            const previousScreen = TEST_LESSON_CONTENT[prevScreenIndex];
            const bodyArray = Array.isArray(previousScreen?.body)
                ? previousScreen.body
                : [previousScreen?.body];

            setSubStep(bodyArray.length > 0 ? bodyArray.length - 1 : 0);
            isNavigatingBack.current = true;
            setScreenIndex(prevScreenIndex);
            return;
        }

        router.back();
    };

    const renderButtonCopy = () => {
        if (isLessonCompleted) {
            return 'lesson.buttons.continue';
        }

        const bodyArray = Array.isArray(currentScreen?.body)
            ? currentScreen.body
            : [currentScreen?.body];
        const isLastScreen = screenIndex >= TEST_LESSON_CONTENT.length - 1;
        const isLastSubStep = subStep >= bodyArray.length - 1;

        if (isLastScreen && isLastSubStep) {
            return 'lesson.buttons.complete';
        }
        return 'lesson.buttons.continue';
    };

    if (!currentScreen) {
        return <LoadingScreen message={LOADING_MESSAGE_KEYS.PREPARING_APP} />;
    }

    return (
        <SafeAreaView style={styles.sLesson}>
            <LessonHeader
                screenCount={screenIndex}
                totalScreens={TEST_LESSON_CONTENT.length - 1}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onBackPress={handleBack}
            />

            {!isLessonCompleted && (
                <LessonScreenOptionsWrapper
                    key={screenIndex}
                    screenType={currentScreen.screenType}
                    lessonContent={currentScreen}
                />
            )}

            {isLessonCompleted && !postFlowData && (
                <LoadingScreen message={LOADING_MESSAGE_KEYS.PREPARING_APP} />
            )}
            {postFlowData && !isPendingComplete && (
                <PostLessonFlow data={postFlowData} currentStep={postFlowSteps[postFlowCount]} />
            )}

            <PauseLessonModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

            {(!isLessonCompleted || postFlowData) && (
                <View
                    style={[
                        styles.cButton,
                        isQuizScreen && !selectedOption && styles.buttonDisabled,
                    ]}
                >
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
    buttonDisabled: {
        opacity: 0.5,
    },
});
