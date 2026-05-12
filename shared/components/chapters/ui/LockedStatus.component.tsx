import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// COMPONENTS
import { SvgIcon } from '@/SvgIcon.component';

// STYLES
import { baseStyles } from '@/shared/styles/design.system';

// TYPES
import { ESvgIconName } from '@/shared/types/enums';

export const LockedStatus: FC = ({}) => {
    return (
        <View>
            <Text style={[baseStyles.h3, styles.status]}>Locked</Text>
            <SvgIcon name={ESvgIconName.LOCKED} />
        </View>
    );
};

const styles = StyleSheet.create({
    status: {
        fontSize: 24,
        textAlign: 'center',
    },
});
