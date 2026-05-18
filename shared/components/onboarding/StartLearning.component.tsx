import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

// COMPONENTS
import { Button } from '../index';

//STYLES
import { baseStyles } from '@/shared/styles/design.system';

// TYPES
import { IStartLearningProps } from '@/shared/types/types';

export const StartLearning: FC<IStartLearningProps> = ({ handleNext, name, description }) => {
    const { t } = useTranslation();

    return (
        <>
            <View style={baseStyles.cHeader}>
                <Text style={[baseStyles.h2, styles.title]}>
                    {t('postOnboardingFlow.start.title')}
                </Text>
            </View>
            <View style={styles.cContent}>
                <Text style={[baseStyles.h2, styles.centeredText]}>{name}</Text>
                <Text style={[baseStyles.h4, styles.centeredText]}>{description}</Text>
            </View>
            <Button copy="postOnboardingFlow.start.buttons.start" onPress={handleNext} />
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        marginBottom: 8,
    },
    cContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredText: {
        textAlign: 'center',
    },
});
