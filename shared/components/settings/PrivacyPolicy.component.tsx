import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

// VERSION
import { version } from '@/package.json';

// STYLES
import { baseStyles, colors } from '@/shared/styles/design.system';

export const PrivacyPolicy: FC = () => {
    const { t } = useTranslation();

    return (
        <View style={styles.scrollContent}>
            <Text style={[baseStyles.p, styles.intro]}>{t('settings.privacyPolicy.intro')}</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('settings.privacyPolicy.section1Title')}</Text>
                <Text style={[baseStyles.p, styles.content]}>
                    {t('settings.privacyPolicy.section1Content')}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('settings.privacyPolicy.section2Title')}</Text>
                <Text style={[baseStyles.p, styles.content]}>
                    {t('settings.privacyPolicy.section2Content')}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('settings.privacyPolicy.section3Title')}</Text>
                <Text style={[baseStyles.p, styles.content]}>
                    {t('settings.privacyPolicy.section3Content')}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('settings.privacyPolicy.section4Title')}</Text>
                <Text style={[baseStyles.p, styles.content]}>
                    {t('settings.privacyPolicy.section4Content')}
                </Text>
            </View>

            <View style={styles.cFooter}>
                <Text style={[baseStyles.caption, styles.footer]}>
                    {t('settings.privacyPolicy.footer')}
                </Text>
                <Text style={[baseStyles.caption, styles.footer]}>v.{version}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        padding: 16,
        paddingBottom: 32,
    },
    intro: {
        marginBottom: 20,
        lineHeight: 22,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6,
        color: colors.text.primary,
    },
    content: {
        lineHeight: 22,
    },
    cFooter: {
        marginVertical: 16,
    },
    footer: {
        fontStyle: 'italic',
        textAlign: 'center',
    },
});
