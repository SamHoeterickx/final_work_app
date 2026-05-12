import { baseStyles, colors } from "@/shared/styles/design.system";
import { ISettingTabProps } from "@/shared/types/types";
import { useRouter } from "expo-router";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SvgIcon } from "../svgIcon/SvgIcon.component";

export const SettingsTab: FC<ISettingTabProps> = ({ icon, copy, path }) => {

    const router = useRouter();
    const { t } = useTranslation();

    const handleOpenAccountSettings = () => {
        router.push(`/(app)/(account)/${path}` as any)
    }

    return (
        <TouchableOpacity
            onPress={handleOpenAccountSettings}
            style={styles.wSettingTab}
        >
            <SvgIcon name={icon} width={32} height={32} color={'#222222'}/>
            <Text style={[baseStyles.h2, styles.tabCopy]}>{t(copy)}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wSettingTab: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 32,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    tabCopy: {
        fontSize: 24
    }
})
