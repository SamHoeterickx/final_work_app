import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

// Dit component wordt gebruikt voor OnboardingQuestionKind.MULTIPLE_CHOICE_TITLE
export const MultipleChoiceTitleQuestion: FC = () => {
    return (
        <View style={styles.container}>
            <Text>Multiple Choice Title Question (TODO)</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    }
});