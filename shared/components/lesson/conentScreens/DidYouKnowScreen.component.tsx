import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// STYLES
import { baseStyles, borderRadius, colors, shadows, spacing } from '@/shared/styles/design.system';

// TYPES
import { ILessonScreenProps } from '@/shared/types/types';
import { useTranslation } from 'react-i18next';

export const DidYouKnowScreen: FC<ILessonScreenProps> = ({ content }) => {
    const { t } = useTranslation();

    return (
        <View style={styles.wrapper}>
            <View style={styles.card}>
                <View style={styles.badge}>
                    <Text style={[baseStyles.h4, styles.badgeText]}>
                        {t('lesson.dykScreen.title')}
                    </Text>
                </View>

                <Text style={styles.decorativeQuote}>“</Text>

                <Text style={[baseStyles.h2, styles.title]}>{content.title}</Text>

                <View style={styles.divider} />

                <Text style={[baseStyles.p, styles.dykFact]}>{content.body}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
    },
    card: {
        backgroundColor: colors.text.secondary,
        borderRadius: borderRadius.lg,
        paddingTop: spacing.xxl,
        paddingBottom: spacing.xl,
        paddingHorizontal: spacing.lg,
        width: '100%',
        alignItems: 'center',
        position: 'relative',

        ...shadows,
    },
    badge: {
        position: 'absolute',
        top: -18,
        backgroundColor: colors.primary,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: borderRadius.full,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    badgeText: {
        color: colors.text.secondary,
        textTransform: 'uppercase',
        letterSpacing: 2,
        fontSize: 18,
    },
    decorativeQuote: {
        position: 'absolute',
        top: 20,
        left: 20,
        fontSize: 100,
        fontFamily: 'serif',
        color: colors.primary,
        opacity: 0.1,
        lineHeight: 100,
    },
    title: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 36,
        lineHeight: 40,
        color: colors.text.primary,
        marginBottom: spacing.md,
        zIndex: 2,
    },
    divider: {
        width: 48,
        height: 4,
        backgroundColor: colors.primary,
        borderRadius: 2,
        marginBottom: spacing.lg,
    },
    dykFact: {
        fontSize: 17,
        textAlign: 'center',
        lineHeight: 28,
        color: '#333333',
        fontStyle: 'italic',
    },
});
