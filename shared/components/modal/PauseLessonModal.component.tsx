import { useRouter } from 'expo-router';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// COMPONENTS
import { Button } from '../buttons/Button.component';

// STORE
import { useLessonStore } from '@/shared/context/lessonStore.context';

// STYLES
import { baseStyles, colors, spacing } from '@/shared/styles/design.system';

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

    if (!isModalOpen) return null;

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
        <View style={styles.overlay}>
            {showConfirmQuit ? (
                <View style={styles.cModal}>
                    <View style={styles.cText}>
                        <Text style={baseStyles.h2}>{t('lesson.paused.quitConfirm.title', 'Are you sure?')}</Text>
                        <Text style={[baseStyles.p, styles.centeredText]}>
                            {t('lesson.paused.quitConfirm.subtitle', 'All progress in this lesson will be lost.')}
                        </Text>
                    </View>

                    <View style={styles.cOptions}>
                        <TouchableOpacity onPress={confirmQuit}>
                            <Text style={styles.optionText}>{t('lesson.paused.options.quit')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setShowConfirmQuit(false)}>
                            <Text style={styles.optionText}>{t('settings.profile.buttons.cancel', 'Cancel')}</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.cButton} />
                </View>
            ) : (
                <View style={styles.cModal}>
                    <View style={styles.cText}>
                        <Text style={baseStyles.h2}>{t('lesson.paused.title')}</Text>
                    </View>

                    <View style={styles.cOptions}>
                        <TouchableOpacity onPress={handleRestart}>
                            <Text style={styles.optionText}>{t('lesson.paused.options.restart')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setShowConfirmQuit(true)}>
                            <Text style={styles.optionText}>{t('lesson.paused.options.quit')}</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.cButton}>
                        <Button
                            copy="lesson.paused.buttons.resume"
                            onPress={() => setIsModalOpen(false)}
                        />
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: -25,
        right: -25, 
        backgroundColor: colors.background,
        zIndex: 5,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cButton: {
        alignItems: 'center',
    },
    cModal: {
        height: '75%',
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
    optionText: {
        ...baseStyles.h3,
        color: colors.text.primary,
        fontSize: 24,
    },
    centeredText: {
        textAlign: 'center',
        marginTop: spacing.sm,
    },
});
