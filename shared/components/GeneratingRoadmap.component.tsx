import { baseStyles } from "@/shared/styles/design.system";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import { LoadingScreen } from "./loadingScreen/LoadingScreen.component";

export const GeneratingRoadmap: FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <Text style={[baseStyles.h1]}>{t('postOnboardingFlow.generating.title')}</Text>    
            <LoadingScreen />
        </>
    )
}