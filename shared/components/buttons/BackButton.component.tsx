import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FC } from 'react';

// STYLES
import { baseStyles, colors } from '@/shared/styles/design.system';

// TYPES
import { IBackButtonProps } from '@/shared/types/types';

export const BackButton: FC<IBackButtonProps> = ({ style }) => {
    const router = useRouter();

    const handleNavigateBack = () => {
        router.back();
    };

    return (
        <Ionicons
            style={[baseStyles.backButton, style]}
            name="chevron-back"
            size={32}
            color={colors.primary}
            onPress={handleNavigateBack}
        />
    );
};
