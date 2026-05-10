import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { FC } from 'react';

// STYLES
import { baseStyles, colors } from '@/shared/styles/design.system';

export const LoadingScreen: FC = () => {
    return (
        <View style={styles.cLoading}>
            <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
            <Text style={[baseStyles.h3, styles.text]}>Loading...</Text>
        </View>
    );
};

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
    },
});
