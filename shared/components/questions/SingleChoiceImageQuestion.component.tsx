import { useOnboardingStore } from "@/shared/context/onboardingStore.context";
import { baseStyles, borderRadius, colors, spacing } from "@/shared/styles/design.system";
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
        gap: spacing.lg,
        alignItems: 'stretch',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.lg,
        minHeight: 90, 

        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: borderRadius.md,

        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,

        opacity: 0.4,
    },
});