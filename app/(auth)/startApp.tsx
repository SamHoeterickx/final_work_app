import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

// COMPONENTS
import { Button } from '@/shared/components';

// STYLES
import { baseStyles } from '@/shared/styles/base.styles';

export default function StartAppScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={ [baseStyles.container, styles.cLogin] }>
            <View style={ styles.cHeader}>
                <Image
                    style={ styles.logo }
                    source={require('@/assets/logos/png/brewlingo_logo_black.png')}
                    resizeMode='contain'
                />
                <Text style={ baseStyles.h3 }>
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
    cLogin: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    }, 
    cHeader: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 124,
    },
    logo: {
        width: '60%',
        maxWidth: 300,
    },
})