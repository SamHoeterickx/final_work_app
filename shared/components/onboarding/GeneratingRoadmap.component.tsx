import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

// COMPONENTS
import { LoadingScreen } from '../index';

// HOOKS
import { useGenerateCustomRoadmap } from '@/shared/hooks/onboarding/useGenerateCustomRoadmap.hook';

// CONST
import { LOADING_MESSAGE_KEYS } from '@/shared/const/loadingScreen.const';

// STYLES
import { baseStyles } from '@/shared/styles/design.system';
import { IGeneratingRoadmapProps } from '@/shared/types/types';

export const GeneratingRoadmap: FC<IGeneratingRoadmapProps> = ({ onsuccess }) => {
    const { t } = useTranslation();

    const { mutate } = useGenerateCustomRoadmap();

    useEffect(() => {
        const timer = setTimeout(() => {
            mutate(undefined, {
                onSuccess: () => onsuccess(),
            });
        }, 4000);

        return () => clearTimeout(timer);
    }, [mutate, onsuccess]);

    return (
        <>
            <View style={baseStyles.cHeader}>
                <Text style={[baseStyles.h2, styles.title]}>
                    {t('postOnboardingFlow.generating.title')}
                </Text>
            </View>
            <View style={styles.cContent}>
                <LoadingScreen message={LOADING_MESSAGE_KEYS.WORLD_SETUP} />
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
        height: 80,
    },
});
