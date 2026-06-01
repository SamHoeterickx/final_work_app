import { useRouter } from 'expo-router';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// COMPONENTS
import { Button } from '../buttons/Button.component';

// STORE
import { useLessonStore } from '@/shared/context/lessonStore.context';

// STYLES
import { baseStyles, borderRadius, colors, spacing } from '@/shared/styles/design.system';

// TYPES
import { IModalProps } from '@/shared/types/types';

export const PauseLessonModal: FC<IModalProps> = ({ isModalOpen, setIsModalOpen }) => {
    const [showConfirmQuit, setShowConfirmQuit] = useState<boolean>(false);
    const { t } = useTranslation();
    const router = useRouter();
    const { setScreenIndex, setIsLessonCompleted } = useLessonStore();

    useEffect(() => {
        if (!isModalOpen) {
            setShowConfirmQuit(false);
        }
    }, [isModalOpen]);

    const handleRestart = () => {
        setScreenIndex(0);
        setIsLessonCompleted(false);
        setIsModalOpen(false);
    };

    const confirmQuit = () => {
        setScreenIndex(0);
        setIsLessonCompleted(false);
        setIsModalOpen(false);
        setShowConfirmQuit(false);
        router.back();
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

                    {showConfirmQuit ? (
                        <View style={styles.contentWrapper}>
                            <View style={styles.cText}>
                                <Text style={baseStyles.h2}>
                                    {t('lesson.paused.quitConfirm.title', 'Are you sure?')}
                                </Text>
                                <Text style={[baseStyles.p, styles.centeredText]}>
                                    {t(
                                        'lesson.paused.quitConfirm.subtitle',
                                        'All progress in this lesson will be lost.',
                                    )}
                                </Text>
                            </View>

                            <View style={styles.cQuit}>
                                <Button
                                    onPress={confirmQuit}
                                    copy="lesson.paused.options.quit"
                                    size="large"
                                />
                                <Button
                                    onPress={() => setShowConfirmQuit(false)}
                                    copy="settings.profile.buttons.cancel"
                                    styles="secundary"
                                    size="large"
                                />
                            </View>

                            <View style={styles.cButton} />
                        </View>
                    ) : (
                        <View style={styles.contentWrapper}>
                            <View style={styles.cText}>
                                <Text style={baseStyles.h2}>{t('lesson.paused.title')}</Text>
                            </View>

                            <View style={styles.cOptions}>
                                <TouchableOpacity onPress={handleRestart}>
                                    <Text style={styles.optionText}>
                                        {t('lesson.paused.options.restart')}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setShowConfirmQuit(true)}>
                                    <Text style={styles.optionText}>
                                        {t('lesson.paused.options.quit')}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.cButton}>
                                <Button
                                    copy="lesson.paused.buttons.resume"
                                    onPress={() => setIsModalOpen(false)}
                                    size="large"
                                />
                            </View>
                        </View>
                    )}
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
        width: '100%',
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
    contentWrapper: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cText: {
        alignItems: 'center',
    },
    cOptions: {
        gap: spacing.lg,
        alignItems: 'center',
    },
    cQuit: {
        alignItems: 'center',
        width: '75%',
    },
    optionText: {
        ...baseStyles.h3,
        color: colors.text.primary,
        fontSize: 24,
    },
    centeredText: {
        textAlign: 'center',
        marginTop: spacing.sm,
    },
    cButton: {
        alignItems: 'center',
        width: '75%',
    },
});
