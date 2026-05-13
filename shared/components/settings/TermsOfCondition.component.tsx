import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

// STYLES
import { baseStyles } from '@/shared/styles/design.system';

export const TermsOfCondition: FC = () => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <Text style={[baseStyles.p, styles.content]}>
                {t('settings.termsOfCondition.content')}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        lineHeight: 24,
    },
});
