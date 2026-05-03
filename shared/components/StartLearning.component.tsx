import { baseStyles } from '@/shared/styles/design.system';
import { IStartLearningProps } from '@/shared/types/types';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from './buttons/Button.component';

export const StartLearning: FC<IStartLearningProps> = ({ handleNext, name }) => {
    const { t } = useTranslation();

    return (
        <>
            <View style={baseStyles.cHeader}>
                <Text style={[baseStyles.h2, styles.title]}>
                    {t('postOnboardingFlow.start.title')}
                </Text>
                <Text style={[baseStyles.p, styles.description]}>
                    {t('postOnboardingFlow.start.description')}
                </Text>
            </View>
            <View style={styles.cContent}>
                <Text style={[baseStyles.h3]}>{name}</Text>
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
    description: {
        textAlign: 'center',
    },
    cContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
