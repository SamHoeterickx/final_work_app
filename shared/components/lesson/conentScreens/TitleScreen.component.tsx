import { baseStyles } from '@/shared/styles/design.system';
import { ILessonScreenProps } from '@/shared/types/types';
import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const TitleScreen: FC<ILessonScreenProps> = ({ content }) => {

    console.log('content', content);
    return (
        <View>
            <Text style={[baseStyles.h2, styles.title]}>{content.title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
    },
});