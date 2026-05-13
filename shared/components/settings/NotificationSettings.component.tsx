import { StyleSheet, Text, View } from 'react-native';

// STYLES
import { baseStyles } from '@/shared/styles/design.system';

export const NotificationSettings = () => {
    return (
        <View style={styles.container}>
            <Text style={[baseStyles.h1, styles.subtitle]}>Comming soon</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    subtitle: {
        textAlign: 'center',
    },
});
