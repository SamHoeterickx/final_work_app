import { useOnboardingStore } from "@/shared/context/onboardingStore.context";
import { baseStyles, PRIMARY_COLOR } from "@/shared/styles/base.styles";
import { IQuestionProps } from "@/shared/types/types";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgIcon } from "../SvgIcon.component";

export const SingleChoiceImageQuestion: FC<IQuestionProps> = ({ options, questionIndex }) => {

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
                { option.image && <SvgIcon name={option.image} width={60} /> }
                <Text style={[baseStyles.h4, { flex: 1 }]}>{option.label}</Text>

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
        minHeight: 90, 

        borderWidth: 2,
        borderColor: PRIMARY_COLOR,
        borderRadius: 16,

        paddingHorizontal: 16,
        paddingVertical: 16,

        opacity: 0.4,
    },
});