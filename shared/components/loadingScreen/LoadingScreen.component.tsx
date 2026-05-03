import { baseStyles, colors } from "@/shared/styles/design.system";
import { FC } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export const LoadingScreen: FC = () => {
    return (
        <View style={styles.cLoading} >
            <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
            <Text style={[baseStyles.h3, styles.text]}>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cLoading: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loader: {
        marginBottom: 16,
    },
    text: {
        textAlign: 'center',
        opacity: 0.6,
    }
})