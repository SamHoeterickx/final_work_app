import { baseStyles } from '@/shared/styles/design.system';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Welcome() {
    return <SafeAreaView style={[baseStyles.container]}></SafeAreaView>;
}
