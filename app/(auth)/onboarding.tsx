import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENTS
import { Button, OnboardingQuestionWrapper } from '@/shared/components';

// CONST
import { onboardingQuestions } from '@/shared/const/onboarding.const';

// STORE
import { useOnboardingStore } from '@/shared/context/onboardingStore.context';

// STYLES
import { baseStyles, borderRadius, colors, spacing } from '@/shared/styles/design.system';

const MAX_ONBOARDING_LENGTH = 6;

export default function OnboardingScreen() {
    const [onboardingCount, setOnboardingCount] = useState<number>(0);

    const { answers } = useOnboardingStore();

    const router = useRouter();
    const { t } = useTranslation();

    const handleBack = () => {
        if (onboardingCount === 0) {
            router.back();
        } else {
            setOnboardingCount((prev) => prev - 1);
        }
    };

    const handleContinueOnboarding = () => {
        if (onboardingCount !== MAX_ONBOARDING_LENGTH) {
            console.log(answers);
            setOnboardingCount((prev) => prev + 1);
        } else {
            router.navigate('/(auth)/register');
        }
    };

    const renderOnboardingQuestion = () => {
        return (
            <>
                <View style={styles.qHeader}>
                    <Text style={baseStyles.h2}>
                        {t(onboardingQuestions[onboardingCount].title)}
                    </Text>
                    <Text style={baseStyles.p}>
                        {t(onboardingQuestions[onboardingCount].description)}
                    </Text>
                </View>
                <OnboardingQuestionWrapper
                    kind={onboardingQuestions[onboardingCount].kind}
                    options={onboardingQuestions[onboardingCount].options}
                    questionIndex={onboardingCount}
                />
            </>
        );
    };

    return (
        <SafeAreaView style={baseStyles.container}>
            <View style={styles.onboardingHeader}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={32} color={colors.primary} />
                </TouchableOpacity>
                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressStatus,
                            { width: `${(onboardingCount / MAX_ONBOARDING_LENGTH) * 100}%` },
                        ]}
                    />
                </View>
            </View>
            <View style={styles.cQuestion}>
                {onboardingQuestions[onboardingCount] && renderOnboardingQuestion()}
            </View>
            <Button
                copy="onboarding.buttons.next"
                onPress={handleContinueOnboarding}
                disabled={!answers[onboardingCount] || answers[onboardingCount].length === 0}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    onboardingHeader: {
        width: '100%',
        paddingTop: spacing.sm,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        width: '15%',
        alignSelf: 'flex-start',
    },
    progressBar: {
        width: '85%',
        height: 15,
        backgroundColor: colors.primary,
        borderRadius: borderRadius.md,
        marginTop: 4,
    },
    progressStatus: {
        height: 15,
        backgroundColor: '#CCC',
        borderRadius: borderRadius.md,
    },
    cQuestion: {
        height: '75%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    qHeader: {
        marginBottom: spacing.lg,
    },
});
