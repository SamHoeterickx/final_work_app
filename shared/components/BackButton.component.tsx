import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FC } from 'react';

import { baseStyles, colors } from '../styles/design.system';

export const BackButton: FC = () => {
  const router = useRouter();

  const handleNavigateBack = () => {
    router.back();
  };

  return (
    <Ionicons
      style={baseStyles.backButton}
      name="chevron-back"
      size={32}
      color={colors.primary}
      onPress={handleNavigateBack}
    />
  );
};
