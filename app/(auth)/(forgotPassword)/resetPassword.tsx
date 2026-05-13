import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENTS
import { BackButton, ChangePasswordSettings } from '@/shared/components';

// STYLES
import { baseStyles, spacing } from '@/shared/styles/design.system';

export default function ResetPassword() {
    const { email, resetCode } = useLocalSearchParams<{ email?: string; resetCode?: string }>();
    const { t } = useTranslation();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={{ flex: 1, position: 'relative' }}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <Image
                        source={require('@/assets/logos/png/brewlingo_logo_v2.png')}
                        style={baseStyles.logo}
                        resizeMode="contain"
                    />
                    <View style={styles.cInputContent}>
                        <View style={styles.cText}>
                            <Text style={[baseStyles.h2, styles.title]}>
                                {t('resetPassword.title')}
                            </Text>
                        </View>
                        <View style={styles.cForm}>
                            <ChangePasswordSettings
                                resetCode={resetCode}
                                email={Array.isArray(email) ? email[0] : email}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <BackButton />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    cText: {
        marginBottom: spacing.xl,
        alignItems: 'center',
        textAlign: 'center',
    },
    title: {
        alignItems: 'center',
        textAlign: 'center',
    },
    cForm: {
        width: '85%',
    },
    scrollContent: {
        flexGrow: 1,
        width: '90%',
        marginHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cInputContent: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginTop: 64,
    },
});
