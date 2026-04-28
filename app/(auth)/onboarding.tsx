import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENTS
import { Button, OnboardingQuestionWrapper } from '@/shared/components';

// CONST
import { onboardingQuestions } from '@/shared/const/onboarding.const';

// STYLES
import { baseStyles } from '@/shared/styles/base.styles';
import { useOnboardingStore } from '@/shared/context/onboardingStore.context';

const MAX_ONBOARDING_LENGTH = 6;

export default function OnboardingScreen() {
    const [onboardingCount, setOnboardingCount] = useState<number>(0);

    const { answers } = useOnboardingStore();

    const router = useRouter();

    const handleBack = () => {
        if(onboardingCount === 0){
            router.back();
        }else {
            setOnboardingCount(prev => prev - 1);
        }
    }

    const handleContinueOnboarding = () => {
        if(onboardingCount !== MAX_ONBOARDING_LENGTH) {
            console.log(answers)
            setOnboardingCount(prev => prev + 1);
        }else {
            // router.navigate('/(auth)/login')
        }
    }

    const renderOnboardingQuestion = () => {
        return (
            <>
                <View style={styles.qHeader}>
                    <Text style={[baseStyles.h2, styles.qTitle]}>{onboardingQuestions[onboardingCount].title}</Text>
                    <Text style={[baseStyles.p, styles.qDescription]}>{onboardingQuestions[onboardingCount].description}</Text>
                </View>
                <OnboardingQuestionWrapper 
                    kind={onboardingQuestions[onboardingCount].kind} 
                    options={onboardingQuestions[onboardingCount].options} 
                    questionIndex={onboardingCount}
                />
            </>
        )
    }

    return (
        <SafeAreaView style={baseStyles.container}>
            <View style={styles.onboardingHeader}>
                <TouchableOpacity 
                    onPress={handleBack}
                    style={styles.backButton}
                >
                    <Ionicons name="chevron-back" size={32} color="#D9D9D9" />
                </TouchableOpacity>
                <View style={styles.progressBar}>
                    <View style={[styles.progressStatus, { width: `${(onboardingCount / MAX_ONBOARDING_LENGTH) * 100}%`}]} />
                </View>
            </View>
            <View style={styles.cQuestion}>
                {onboardingQuestions[onboardingCount] && renderOnboardingQuestion()}
            </View>
            <Button 
                copy='Volgende'
                onPress={handleContinueOnboarding}
                disabled={!answers[onboardingCount] || answers[onboardingCount].length === 0}
            />
        </SafeAreaView>
    );
}   

const styles = StyleSheet.create({
    onboardingHeader: {
        width: '100%',
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    backButton: {
        width: '15%',
        alignSelf: 'flex-start',
    },
    progressBar: {
        width: '85%',
        height: 15,
        backgroundColor: '#D9D9D9',
        borderRadius: 16,
        marginTop: 4,
    },
    progressStatus: {
        height: 15,
        backgroundColor: '#CCC',
        borderRadius: 16
    },
    cQuestion: {
        height: '75%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    qHeader: {
        marginBottom: 24,
    },
    qTitle: {
        fontSize: 20
    },
    qDescription: {
        fontSize: 14
    }
})