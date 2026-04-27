import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

// Dit component wordt gebruikt voor OnboardingQuestionKind.SINGLE_CHOICE
export const SingleChoiceQuestion: FC = () => {
    return (
        <View style={styles.container}>
            <Text>Single Choice Question (TODO)</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    }
});