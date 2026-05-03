import { baseStyles } from "@/shared/styles/design.system";
import { IStartLearningProps } from "@/shared/types/types";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { Button } from "./buttons/Button.component";


export const StartLearning: FC<IStartLearningProps> = ({ handleNext, name }) => {

    const { t } = useTranslation();

    return (
        <>
            <View>
                <Text style={[baseStyles.h2]}>{t('postOnboardingFlow.start.title')}</Text>
                <Text style={[baseStyles.p]}>{t('postOnboardingFlow.start.description')}</Text>
                <Text style={[baseStyles.h3]}>{name}</Text>
            </View>
            <Button
                copy="postOnboardingFlow.start.buttons.start"
                onPress={handleNext}
            />
        </>
    )
}