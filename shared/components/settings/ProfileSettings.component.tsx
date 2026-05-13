import { StyleSheet, View } from "react-native"

// COMPONENTS
import { SettingsTab } from "./SettingsTab.component"
import { PROFILE_SETTINGS_OPTIONS } from "@/shared/const/settings.const"
import { Button } from "../buttons/Button.component"

// CONST


export const ProfileSettings = () => {

    const renderProfileSettingTabs = () => {
        return PROFILE_SETTINGS_OPTIONS.map((setting, index) => (
            <SettingsTab
                key={index}
                copy={setting.copy}
                path={setting.path}
            />
        ));
    }

    const handleDeleteAccount = () => {

    }

    return (
        <>
            <View style={styles.cSettingTabs}>
                {renderProfileSettingTabs()}                    
            </View>


            <View style={styles.cButton}>
                <Button 
                    copy='settings.profile.buttons.delete'
                    onPress={handleDeleteAccount}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    cSettingTabs: {
        gap: 16,
    },
    cButton: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
    },
})