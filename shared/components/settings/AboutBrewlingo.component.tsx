import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

// STYLES
import { baseStyles, colors } from '@/shared/styles/design.system';

export const AboutBrewlingo: FC = () => {
    const { t } = useTranslation();

    return (
        <View style={styles.scrollContent}>
            <Text style={[baseStyles.p, styles.intro]}>{t('settings.about.intro')}</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('settings.about.missionTitle')}</Text>
                <Text style={[baseStyles.p, styles.content]}>
                    {t('settings.about.missionContent')}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('settings.about.featuresTitle')}</Text>
                <Text style={[baseStyles.p, styles.content]}>
                    {t('settings.about.featuresContent')}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('settings.about.creatorTitle')}</Text>
                <Text style={[baseStyles.p, styles.content]}>
                    {t('settings.about.creatorContent')}
                </Text>
            </View>

            <Text style={[baseStyles.caption, styles.footer]}>{t('settings.about.footer')}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        padding: 16,
        paddingBottom: 32,
    },
    intro: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
        color: colors.text.primary,
    },
    content: {
        lineHeight: 22,
    },
    footer: {
        marginVertical: 16,
        textAlign: 'center',
        fontStyle: 'italic',
    },
});
