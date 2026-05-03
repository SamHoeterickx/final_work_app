import { baseStyles } from "@/shared/styles/design.system";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

export const LoadingScreen: FC = () => {
    return (
        <View style={styles.cLoading} >
            <Text style={baseStyles.h2}>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cLoading: {
        flex: 1
    }
})