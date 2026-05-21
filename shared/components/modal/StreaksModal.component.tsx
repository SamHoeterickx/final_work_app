import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// CONTEXT
import { useUserDataStore } from '@/shared/context/userDataStore.context';
import { SvgIcon } from '../svgIcon/SvgIcon.component';

// CONST
import { KEEP_GOING_MESSAGES, START_STREAK_MESSAGES } from '@/shared/const/account.const';

// STYLES
import { baseStyles, borderRadius, colors, spacing } from '@/shared/styles/design.system';

// TYPES
import { ESvgIconName } from '@/shared/types/enums';
import { IModalProps } from '@/shared/types/types';

export const StreaksModal: FC<IModalProps> = ({ isModalOpen, setIsModalOpen }) => {
    const { t, i18n } = useTranslation();
    const { streaks, longestStreak } = useUserDataStore();

    const renderStreaksMessage = () => {
        const rIndex = Math.floor(Math.random() * 9);

        if (streaks !== 0) {
            return KEEP_GOING_MESSAGES.map((messagesSet) => {
                if (messagesSet.lang === i18n.language) {
                    return messagesSet.options[rIndex];
                }
            });
        } else {
            return START_STREAK_MESSAGES.map((messagesSet) => {
                if (messagesSet.lang === i18n.language) {
                    return messagesSet.options[rIndex];
                }
            });
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
        >
            <View style={styles.overlay}>
                <TouchableOpacity
                    style={styles.backdrop}
                    onPress={() => setIsModalOpen(false)}
                    activeOpacity={1}
                />

                <View style={styles.modalContent}>
                    <View style={styles.dragIndicator} />
                    <Text style={[baseStyles.h2, styles.title]}>{t('streaks.title')}</Text>

                    <View style={styles.cCurrent}>
                        <View style={styles.wCurrent}>
                            <Text style={[baseStyles.h1, styles.streakNumber]}>{streaks || 0}</Text>
                            <SvgIcon name={ESvgIconName.STREAKS} width={100} height={100} />
                        </View>

                        <Text style={[baseStyles.h2, styles.streakText]}>
                            {t('streaks.dayStreaks')}
                        </Text>

                        <Text style={[baseStyles.p, styles.streakMotivation]}>
                            {renderStreaksMessage()}
                        </Text>
                    </View>

                    <View style={styles.statsContainer}>
                        <View style={styles.statBox}>
                            <Text style={baseStyles.h2}>{longestStreak || 0}</Text>
                            <Text style={[baseStyles.p, styles.statLabel]}>
                                {t('streaks.longest')}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    backdrop: {
        flex: 1,
        width: '100%',
    },
    modalContent: {
        height: '75%',
        backgroundColor: colors.background,
        borderTopLeftRadius: borderRadius.lg,
        borderTopRightRadius: borderRadius.lg,
        paddingTop: spacing.md,
        paddingBottom: spacing.xl,
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    dragIndicator: {
        width: 40,
        height: 4,
        backgroundColor: colors.text.muted,
        borderRadius: borderRadius.full,
        marginBottom: spacing.xl,
    },
    title: {
        marginBottom: spacing.md,
        textAlign: 'center',
    },

    cCurrent: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xl,
        width: '100%',
    },
    wCurrent: {
        flexDirection: 'row',
    },
    streakNumber: {
        fontSize: 120,
        lineHeight: 120,
        marginTop: spacing.md,
        color: colors.text.primary,
    },
    streakText: {
        fontSize: 36,
        lineHeight: 40,
        color: colors.text.primary,
        marginTop: -10,
    },
    streakMotivation: {
        marginTop: spacing.sm,
        fontSize: 14,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: colors.text.muted,
    },

    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: spacing.xl,
        borderTopWidth: 1,
        borderColor: colors.text.muted + '40',
        paddingTop: spacing.xxl,
    },
    statBox: {
        alignItems: 'center',
    },
    statLabel: {
        marginTop: spacing.xs,
        color: colors.text.muted,
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontSize: 12,
    },
});
