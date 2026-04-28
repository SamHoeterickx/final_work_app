import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// STYLES
import { baseStyles, PRIMARY_COLOR } from "@/shared/styles/base.styles";
import { IQuestionProps } from "@/shared/types/types";

// STORE
import { useOnboardingStore } from "@/shared/context/onboardingStore.context";

// COMPONENTS
import { SvgIcon } from "../SvgIcon.component";

export const MultipleChoiceTilesQuestion: FC<IQuestionProps> = ({ options, questionIndex }) => {
    const { answers, toggleMultipleChoiceAnswer } = useOnboardingStore();
    const currentAnswers = answers[questionIndex] || [];

    const handleOnPress = (index: number) => {
        toggleMultipleChoiceAnswer(questionIndex, index);
    }

    const renderOptions = () => {
        return options.map((option, index) => (
            <TouchableOpacity 
                key={index} 
                style={[
                    styles.tileOption, 
                    currentAnswers.includes(index) && { opacity: 1 }
                ]}
                onPress={() => handleOnPress(index)}
            >
                <SvgIcon name={option.image} width={60} height={60} />
                <Text style={[baseStyles.h4, styles.tileLabel]}>{option.label}</Text>
            </TouchableOpacity>
        ));
    };

    return (
        <View style={styles.container}>
            { options && renderOptions() }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    tileOption: {
        width: '47.5%',
        height: '33%',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
 
        borderWidth: 2,
        borderColor: PRIMARY_COLOR,

        paddingHorizontal: 16,
        paddingVertical: 16,

        opacity: 0.4,
    },
    tileLabel: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 600,
        textTransform: 'uppercase',
        marginTop: 24,
    }
});