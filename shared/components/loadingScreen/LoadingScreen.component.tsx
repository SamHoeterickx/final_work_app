import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { FC } from 'react';

// STYLES
import { baseStyles, colors } from '@/shared/styles/design.system';

interface ILoadingScreenProps {
    loadingFor?: string;
    message?: string;
}

export const LoadingScreen: FC<ILoadingScreenProps> = ({ loadingFor, message }) => {
    return (
        <View style={styles.cLoading}>
            <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
            <Text style={[baseStyles.h3, styles.text]}>Loading...</Text>
            <Text style={[baseStyles.h4, styles.text]}>{loadingFor && loadingFor} {message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cLoading: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    loader: {
        marginBottom: 16,
    },
    text: {
        textAlign: 'center',
        opacity: 0.6,
    },
});
