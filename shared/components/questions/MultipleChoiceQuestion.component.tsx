import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

// Dit component wordt gebruikt voor OnboardingQuestionKind.MULTIPLE_CHOICE
export const MultipleChoiceQuestion: FC = () => {
    return (
        <View style={styles.container}>
            <Text>Multiple Choice Question (TODO)</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    }
});