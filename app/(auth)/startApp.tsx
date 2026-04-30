import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENTS
import { Button } from '@/shared/components';

// STYLES
import { baseStyles, spacing, typography } from '@/shared/styles/design.system';

export default function StartAppScreen() {
  const router = useRouter();

  const { t } = useTranslation();

  return (
    <SafeAreaView style={[baseStyles.container]}>
      <Image
        style={styles.logo}
        source={require('@/assets/logos/png/brewlingo_logo_black.png')}
        resizeMode="contain"
      />
      <View style={styles.cHeader}>
        <Text style={[typography.h1, styles.title]}>{t('startApp.title')}</Text>
        <Text style={[typography.bodySmall, styles.subtitle]}>{t('startApp.subtitle')}</Text>
      </View>

      <View style={baseStyles.cButton}>
        <Button
          copy="startApp.buttons.onboarding"
          onPress={() => router.navigate('/(auth)/onboarding')}
        />
        <Button
          copy="startApp.buttons.login"
          onPress={() => router.navigate('/(auth)/login')}
          styles="secundary"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cHeader: {
    width: '85%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '35%',
    marginTop: spacing.xxl,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
  },
});
