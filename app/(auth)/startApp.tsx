import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENTS
import { Button } from '@/shared/components';

// STYLES
import { baseStyles } from '@/shared/styles/base.styles';

export default function StartAppScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={[baseStyles.container]}>
            <Image
                style={styles.logo}
                source={require('@/assets/logos/png/brewlingo_logo_black.png')}
                resizeMode='contain'
            />
            <View style={ styles.cHeader}>
                {/* <Image
                    style={styles.placeholderImage}
                    source={require('@/assets/images/android-icon-background.png')}
                    resizeMode='contain'
                /> */}
                <Text style={baseStyles.h3}>
                    Ontdek de wereld van koffie
                </Text>
            </View>

            <View style={baseStyles.cButton}>
                <Button 
                    copy='START MIJN REIS' 
                    onPress={() => router.navigate('/(auth)/onboarding')} 
                />
                <Button 
                    copy='HERVAT MIJN REIS' 
                    onPress={() => router.navigate('/(auth)/login')} 
                    styles='secundary'
                />
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    cHeader: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    logo: {
        width: '35%',
    },
})