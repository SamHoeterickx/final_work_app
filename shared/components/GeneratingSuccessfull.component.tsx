import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

// COMPONENTS
import { baseStyles } from "@/shared/styles/design.system";
import { IPostOnboardingFlowProps } from "@/shared/types/types";
import { Button } from "./buttons/Button.component";


export const GeneratingSuccessfull: FC<IPostOnboardingFlowProps> = ({ handleNext }) => {

    const { t } = useTranslation();

    return (
        <>
            <View>
                <Text style={[baseStyles.h1]}>{t('postOnboardingFlow.success.title')}</Text>
                <Text style={[baseStyles.h3]}>{t('postOnboardingFlow.success.description')}</Text>
            </View>
            <Button
                copy="postOnboardingFlow.success.buttons.continue"
                onPress={handleNext}
            />
        </>
    )
}