import { StyleSheet, TextStyle, ViewStyle } from "react-native";

export const colors = {
    primary: '#D9D9D9',
    secondary: '#',
    accent: '#',
    accentLight: '#',
    background: '#EFEFEF',
    
    text: {
        primary: '#',
        secondary: '#',
        muted: '#',
        inverse: '#',
    },
    
    success: '#',
    warning: '#',
    error: '#',
    
    border: '#',
    shadow: '#',
    overlay: '#',
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const borderRadius = {
    sm: 8,
    md: 16,
    lg: 24,
    full: 9999,
};

export const typography = {
    h1: {
        fontFamily: 'Inter_900Black',
        fontSize: 32,
        letterSpacing: -0.5,
        color: colors.text.primary,
    },
    h2: {
        fontFamily: 'Inter_800ExtraBold',
        fontSize: 24,
        color: colors.text.primary,
    },
    h3: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: colors.text.primary,
    },
    h4: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        color: colors.text.primary,
    },
    body: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: colors.text.secondary,
    },
    bodySmall: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: colors.text.secondary,
    },
    caption: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        letterSpacing: 0.3,
        color: colors.text.muted,
    },
};

export const shadows = {
    small: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    medium: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
};

/**
 * BASE STYLES
 */
export const baseStyles = StyleSheet.create({
    // Layout
    container: {
        width: '90%',
        height: '100%',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: '5%',

        backgroundColor: colors.background
    },
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: spacing.lg,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    // Typography
    h1: { ...typography.h1 } as TextStyle,
    h2: { ...typography.h2 } as TextStyle,
    h3: { ...typography.h3 } as TextStyle,
    h4: { ...typography.h4 } as TextStyle,
    p: { ...typography.body } as TextStyle,
    caption: { ...typography.caption } as TextStyle,
    
    inputGroup: {
        marginBottom: spacing.lg,
    } as ViewStyle,
    
    errorText: {
        ...typography.bodySmall,
        color: colors.error,
        marginTop: spacing.xs,
    } as TextStyle,

    wrapper: {

    },
    cButton: {
        width: '100%'
    },

    error: {
        color: 'red'
    },

    // ==================/==================
    // ============BUTTON STYLING===========
    // ==================/==================
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',

        paddingVertical: spacing.lg,
        marginTop: 12,

        borderRadius: borderRadius.md,

        backgroundColor: colors.primary,
    },
    sButton: {

    },
    xlButton: {

    },
    secundaryButton: {
        backgroundColor: colors.secondary,
        borderWidth: 2,
        borderColor: colors.primary,
    },
    buttonCopy: {
        textTransform: 'uppercase',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
    },
    backButton: {
        position: 'absolute',
        left: spacing.lg,
        top: 100,
    },

    // ==================/==================
    // ==========INPUTFIELD STYLING=========
    // ==================/==================
    cInputField: {
        width: '100%'
    },
    inputField: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: colors.secondary,
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: borderRadius.md,
    }
});