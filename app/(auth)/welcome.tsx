import { SafeAreaView } from 'react-native-safe-area-context';
import { baseStyles } from '@/shared/styles/design.system';

export default function Welcome() {
    return <SafeAreaView style={[baseStyles.container]}></SafeAreaView>;
}
