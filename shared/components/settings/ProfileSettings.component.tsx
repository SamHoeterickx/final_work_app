import { useState } from "react"
import { StyleSheet, View } from "react-native"

// COMPONENTS
import { Button } from "../buttons/Button.component"
import { SettingsTab } from "./SettingsTab.component"

// CONST
import { PROFILE_SETTINGS_OPTIONS } from "@/shared/const/settings.const"
import { DeleteUserModal } from "../modal/DeleteAccountModal.component"


export const ProfileSettings = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    
    const renderProfileSettingTabs = () => {
        return PROFILE_SETTINGS_OPTIONS.map((setting, index) => (
            <SettingsTab
                key={index}
                copy={setting.copy}
                path={setting.path}
            />
        ));
    }


    return (
        <>
            <View style={styles.cSettingTabs}>
                {renderProfileSettingTabs()}                    
            </View>

            <DeleteUserModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />

            <View style={styles.cButton}>
                <Button 
                    copy='settings.profile.buttons.delete'
                    onPress={() => setIsModalOpen(true)}
                    disabled={isModalOpen}
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