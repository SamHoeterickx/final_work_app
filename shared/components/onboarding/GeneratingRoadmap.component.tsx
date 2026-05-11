import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

// COMPONENTS
import { LoadingScreen } from '../index';

// STYLES
import { baseStyles } from '@/shared/styles/design.system';

export const GeneratingRoadmap: FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <View style={baseStyles.cHeader}>
                <Text style={[baseStyles.h2, styles.title]}>
                    {t('postOnboardingFlow.generating.title')}
                </Text>
            </View>
            <View style={styles.cContent}>
                <LoadingScreen />
            </View>
            <View style={styles.cFooter} />
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
    },
    cContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cFooter: {
        height: 80, // Approximate height of the button in other screens to keep layout consistent
    },
});
