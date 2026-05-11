import { Ionicons } from '@expo/vector-icons';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

// COMPONENTS
import { Button } from '../index';

// STYLES
import { baseStyles, colors } from '@/shared/styles/design.system';

// TYPES
import { IPostOnboardingFlowProps } from '@/shared/types/types';

export const GeneratingSuccessfull: FC<IPostOnboardingFlowProps> = ({ handleNext }) => {
    const { t } = useTranslation();

    return (
        <>
            <View style={baseStyles.cHeader}>
                <Text style={[baseStyles.h2, styles.title]}>
                    {t('postOnboardingFlow.success.title')}
                </Text>
                <Text style={[baseStyles.p, styles.description]}>
                    {t('postOnboardingFlow.success.description')}
                </Text>
            </View>
            <View style={styles.cContent}>
                <Ionicons name="checkmark-circle" size={100} color={colors.primary} />
            </View>
            <Button copy="postOnboardingFlow.success.buttons.continue" onPress={handleNext} />
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
