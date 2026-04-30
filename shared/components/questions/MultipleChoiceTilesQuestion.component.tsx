import { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// COMPONENTS
import { SvgIcon } from "../SvgIcon.component";

// STORE
import { useOnboardingStore } from "@/shared/context/onboardingStore.context";

// STYLES
import { baseStyles, borderRadius, colors, spacing } from "@/shared/styles/design.system";

// TYPES
import { IQuestionProps } from "@/shared/types/types";

export const MultipleChoiceTilesQuestion: FC<IQuestionProps> = ({ options, questionIndex }) => {
    const { answers, toggleMultipleChoiceAnswer } = useOnboardingStore();
    const { t } = useTranslation();

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
                { option.image && <SvgIcon name={option.image} width={60} height={60} /> }
                <Text style={[baseStyles.h4, styles.tileLabel]}>{t(option.label)}</Text>
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
        gap: spacing.md,
    },
    tileOption: {
        width: '47.5%',
        height: '33%',
        borderRadius: borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
 
        borderWidth: 2,
        borderColor: colors.primary,

        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,

        opacity: 0.4,
    },
    tileLabel: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 600,
        textTransform: 'uppercase',
        marginTop: spacing.lg,
    }
});