import { baseStyles, borderRadius, colors, spacing } from '@/shared/styles/design.system';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgIcon } from '../svgIcon/SvgIcon.component';
import { ESvgIconName } from '@/shared/types/enums';
import { useUserDataStore } from '@/shared/context/userDataStore.context';
import { useState } from 'react';
import { StreaksModal } from '../index';

export const HomeHeader = () => {
    const [isStreaksModalOpen, setIsStreakModalOpen] = useState<boolean>(false);

    const { streaks } = useUserDataStore();

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
                {/* <TouchableOpacity style={styles.wStreaks}>
                    <SvgIcon name={ESvgIconName.NOTIFICATIONS} />
                </TouchableOpacity> */}
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
        top: Platform.OS === 'ios' ? 96 : 72,
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
