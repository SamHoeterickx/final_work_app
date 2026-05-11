import { SvgIcon } from '@/shared/components/SvgIcon.component';
import { borderRadius, colors } from '@/shared/styles/design.system';
import { ESvgIconName } from '@/shared/types/enums';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

interface AnimatedTabIconProps {
    focused: boolean;
    size: number;
    iconName: ESvgIconName;
}

const AnimatedTabIcon = ({ focused, size, iconName }: AnimatedTabIconProps) => {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: withTiming(focused ? colors.primary : 'transparent', { duration: 250 }),
            transform: [{ scale: withSpring(focused ? 1.1 : 1, { damping: 10, stiffness: 60 }) }],
        };
    });

    return (
        <Animated.View style={[styles.tabItem, animatedStyle]}>
            <SvgIcon 
                name={iconName} 
                width={size} 
                color={focused ? colors.text.secondary : colors.text.muted} 
            />
        </Animated.View>
    );
};

export default function AppLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle,
                tabBarItemStyle: styles.tabBarItemStyle
            }}
        >
            <Tabs.Screen 
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused, size }) => (
                        <AnimatedTabIcon 
                            focused={focused} 
                            size={size} 
                            iconName={ESvgIconName.HOME} 
                        />
                    ),
                }}
            />
            <Tabs.Screen 
                name="account"
                options={{
                    title: 'Account',
                    tabBarIcon: ({ focused, size }) => (
                        <AnimatedTabIcon 
                            focused={focused} 
                            size={size} 
                            iconName={ESvgIconName.ACCOUNT} 
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 110,
        backgroundColor: '#FFF',
        borderTopWidth: 0,
        elevation: 0,
        margin: 0,
        borderTopLeftRadius: borderRadius.lg,
        borderTopRightRadius: borderRadius.lg,
    },
    tabBarItemStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35,
    },
    tabItem: {
        width: 90,  
        height: 60,
        borderRadius: borderRadius.full,
        justifyContent: 'center',
        alignItems: 'center',
    }
})