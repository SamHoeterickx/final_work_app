import { FC } from 'react';
import { Text, View } from 'react-native';

// TYPES
import { ILessonScreenProps } from '@/shared/types/types';

export const DidYouKnowScreen: FC<ILessonScreenProps> = ({ content }) => {

    console.log(content);
    
    return (
        <View>
            <Text>DID YOU KNOW</Text>
        </View>
        );
};