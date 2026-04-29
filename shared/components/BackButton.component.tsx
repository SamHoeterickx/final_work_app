import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FC } from "react";

import { baseStyles } from "../styles/base.styles";

export const BackButton: FC = () => {
    const router = useRouter();

    const handleNavigateBack = () => {
        router.back();
    }

    return (
        <Ionicons style={baseStyles.backButton} name="chevron-back" size={32} color="#D9D9D9" onPress={handleNavigateBack} />
    )
}