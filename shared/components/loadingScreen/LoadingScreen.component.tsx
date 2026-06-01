import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { baseStyles, colors } from '@/shared/styles/design.system';
import { ILoadingScreenProps } from '@/shared/types/types';

export const LoadingScreen: FC<ILoadingScreenProps> = ({ message }) => {
    const { t } = useTranslation();

    const [randomFactIndex] = useState(() => Math.floor(Math.random() * 20) + 1);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
            <Text style={[baseStyles.h3, styles.label]}>Loading...</Text>

            {message && <Text style={[baseStyles.h4, styles.label]}>{t(message)}</Text>}

            <View style={styles.dykContainer}>
                <Text style={[baseStyles.h3, styles.dykTitle]}>{t('lesson.dykScreen.title')}</Text>
                <Text style={[baseStyles.p, styles.dykText]}>
                    {t(`loadingScreen.didYouKnow.${randomFactIndex}`)}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loader: {
        marginBottom: 16,
    },
    label: {
        textAlign: 'center',
        opacity: 0.6,
    },
    dykContainer: {
        position: 'absolute',
        bottom: 100,
        paddingHorizontal: 40,
        width: '100%',
        alignItems: 'center',
    },
    dykTitle: {
        color: colors.primary,
        marginBottom: 8,
        textAlign: 'center',
    },
    dykText: {
        textAlign: 'center',
        opacity: 0.8,
    },
});
