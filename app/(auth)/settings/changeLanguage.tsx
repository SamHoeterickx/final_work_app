import { BackButton, Button } from "@/shared/components";
import { baseStyles } from "@/shared/styles/design.system";
import { ELocales } from "@/shared/types/types";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangeLanguage(){
    const [selectedLanguage, setSelectedLanguage] = useState<ELocales | null>(null);

    const { i18n } = useTranslation();
    const router = useRouter();

    useEffect(() => {
        setSelectedLanguage(i18n.language as ELocales)
    }, [])

    
    const handleChangeLanguage = () => {
        if(!selectedLanguage) return;
        
        i18n.changeLanguage(selectedLanguage);
        router.back();
    }
    
    return (
        <SafeAreaView style={[baseStyles.container, { position: 'relative' }]}>
            <Text style={[baseStyles.h2, styles.title]}>Change language</Text>
            <View>
                
            </View>
            <Button
                copy="Save Changes"
                onPress={handleChangeLanguage}
            />
            <BackButton style={{left: 0}} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        marginTop: 36,
    }
})