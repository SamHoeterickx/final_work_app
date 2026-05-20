import { baseStyles, spacing } from '@/shared/styles/design.system';
import { ILessonScreenProps } from '@/shared/types/types';
import { FC, useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, View } from 'react-native';

const HEIGHT = Dimensions.get('screen').height;

export const TitleScreen: FC<ILessonScreenProps> = ({ content }) => {

    
    const posAnim = useRef(new Animated.Value( HEIGHT / 4)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(posAnim, {
            toValue: spacing.xxl,
            easing: Easing.back(1),
            duration: 1000,
            useNativeDriver: true
        }).start();

       const timer = setTimeout(() => {
            Animated.timing(opacityAnim, {
                toValue: 100,
                easing: Easing.back(1),
                duration: 1000,
                useNativeDriver: true
            }).start();
       }, 1000);

       return () => clearTimeout(timer);
    }, [posAnim, opacityAnim])

    return (

        <>
            <View style={styles.wTitleScreen}>
                <Animated.Text style={[
                    baseStyles.h2, 
                    styles.title,
                    { transform: [{ translateY: posAnim }] }
                ]}>{content.title}</Animated.Text>        
                <Animated.Text style={[
                    baseStyles.p,
                    styles.bodyText, 
                    { opacity: opacityAnim }
                ]}>{content.body}</Animated.Text>        
            </View>
          
        </>
    )
};

const styles = StyleSheet.create({
    wTitleScreen: {
        flex: 1,
    },
    title: {
        textAlign: 'center',
        position: 'absolute',
        width: '100%'
    },
    bodyText: {
        marginTop: 150,
        textAlign: "center",
    }
});