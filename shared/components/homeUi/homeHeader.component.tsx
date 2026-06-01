import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FC, useState } from 'react';

// COMPONENTS
import { SvgIcon } from '../svgIcon/SvgIcon.component';
import { StreaksModal } from '../index';

// CONTEXT
import { useUserDataStore } from '@/shared/context/userDataStore.context';

// STYLES
import { baseStyles, borderRadius, colors, spacing } from '@/shared/styles/design.system';

// TYPES
import { EProgressStatus, ESvgIconName } from '@/shared/types/enums';
import { useHomeStore } from '@/shared/context/homeStore.context';
import { useTranslation } from 'react-i18next';

export const HomeHeader: FC = () => {
    const [isStreaksModalOpen, setIsStreakModalOpen] = useState<boolean>(false);

    const { aChapterStatus, returnToCurrentChapter } = useHomeStore();
    const { streaks } = useUserDataStore();

    const { t } = useTranslation();

    const renderReturnButton = () => {
        if(aChapterStatus === EProgressStatus.LOCKED || aChapterStatus === EProgressStatus.COMPLETED){
            return (
                <TouchableOpacity style={styles.wStreaks} onPress={() => returnToCurrentChapter()}>
                    {/* <Text style={baseStyles.a}>{t('homeHeader.backToCurrent')}</Text> */}
                    <SvgIcon name={ESvgIconName.RETURN} />
                </TouchableOpacity>
            )
        }
    }

    return (
        <>
            <View style={styles.wHeader}>
                <TouchableOpacity
                    onPress={() => setIsStreakModalOpen(true)}
                    style={styles.wStreaks}
                >
                    <Text style={baseStyles.h3}>{streaks}</Text>
                    <SvgIcon name={ESvgIconName.STREAKS} />
                </TouchableOpacity>
                {renderReturnButton()}
            </View>
            <StreaksModal isModalOpen={isStreaksModalOpen} setIsModalOpen={setIsStreakModalOpen} />
        </>
    );
};

const styles = StyleSheet.create({
    wHeader: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: Platform.OS === 'ios' ? spacing.xxl * 2.25 : spacing.xxl * 1.6,
        paddingHorizontal: 25,
    },
    wStreaks: {
        minWidth: 48,
        height: 48,
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.full,
        backgroundColor: colors.text.secondary,
        paddingHorizontal: spacing.lg,
    },
});
