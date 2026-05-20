import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// STYLES
import { baseStyles, spacing } from '@/shared/styles/design.system';

// TYPES
import { ILessonScreenProps } from '@/shared/types/types';

export const DidYouKnowScreen: FC<ILessonScreenProps> = ({ content }) => {

    console.log(content);

    return (
        <View style={styles.wrapper}>
            <Text style={[baseStyles.h2, styles.title]}>{content.title}</Text>
            <Text style={[baseStyles.p, styles.dykFact]}>{content.body}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        width: '100%',
        marginBottom: spacing.lg,
    },
    dykFact: {
        fontSize: 16,
        textAlign: 'center'
    }
})