import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

// COMPONENTS
import { SvgIcon } from '../svgIcon/SvgIcon.component';
import { StreaksModal } from '../index';

// CONTEXT
import { useUserDataStore } from '@/shared/context/userDataStore.context';

// STYLES
import { baseStyles, borderRadius, colors, spacing } from '@/shared/styles/design.system';

// TYPES
import { ESvgIconName } from '@/shared/types/enums';

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
