import { useOnboardingStore } from "@/shared/context/onboardingStore.context";
import { baseStyles, PRIMARY_COLOR } from "@/shared/styles/base.styles";
import { IQuestionProps } from "@/shared/types/types";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const SingleChoiceTitleQuestion: FC<IQuestionProps> = ({ options, questionIndex }) => {

    const { answers, setSingleChoiceAnswer } = useOnboardingStore();
    const currentAnswers = answers[questionIndex] || [];

    const handleOnPress = (index: number) => {
        setSingleChoiceAnswer(questionIndex, index);
    }

    const renderOptions = () => {
        return options.map((option, index) => (
            <TouchableOpacity
                key={index} 
                style={[
                    styles.option,
                    currentAnswers.includes(index) && { opacity: 1 }
                ]}
                onPress={() => handleOnPress(index)}
            >
                <View style={[styles.selectBox, currentAnswers.includes(index) && {backgroundColor: PRIMARY_COLOR}]}/>
                <View style={styles.textWrapper}> 
                    <Text style={baseStyles.h4}>{option.label}</Text>
                    <Text style={baseStyles.p}>{option.description}</Text>
                </View>
            </TouchableOpacity>
        ));
    }

    return (
        <View style={styles.container}>
            { options && renderOptions() }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 24,
        alignItems: 'stretch',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
        minHeight: 100, 

        borderWidth: 2,
        borderColor: PRIMARY_COLOR,
        borderRadius: 16,

        paddingHorizontal: 16,
        paddingVertical: 16,

        opacity: 0.4,
    },
    selectBox: {
        width: 30,
        height: 30,
        borderRadius: 40,
        borderColor: PRIMARY_COLOR,
        borderWidth: 2
    },
    textWrapper: {
        flex: 1, 
        gap: 4,
    }
});