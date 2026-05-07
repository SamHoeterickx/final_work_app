import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export const colors = {
    primary: '#465E3C',
    secondary: '#222222',
    background: '#E8DFD3',

    text: {
        primary: '#222222',
        secondary: '#FFFFFF',
        muted: '#646464',
        inverted: '#465E3C'
    },

    success: '#',
    warning: '#',
    error: '#',

    border: '#465E3C',
    shadow: '#',
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
        fontFamily: 'Vanguard-Heavy',
        fontSize: 32,
        letterSpacing: -0.5,
        color: colors.text.primary,
    },
    h2: {
        fontFamily: 'Vanguard-ExtraBold',
        fontSize: 24,
        color: colors.text.primary,
    },
    h3: {
        fontFamily: 'Vanguard-Bold',
        fontSize: 20,
        color: colors.text.primary,
    },
    h4: {
        fontFamily: 'Vanguard-DemiBold',
        fontSize: 22,
        color: colors.text.primary,
    },
    body: {
        fontFamily: 'Vanguard-Regular',
        fontSize: 16,
        color: colors.text.secondary,
    },
    bodySmall: {
        fontFamily: 'Vanguard-Regular',
        fontSize: 14,
        color: colors.text.secondary,
    },
    caption: {
        fontFamily: 'Vanguard-Light',
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
    cHeader: {
        alignItems: 'center',
        marginTop: 64,
    },

    // Typography (Hooks into the typography object above)
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

    wrapper: {},
    cButton: {
        // width: '100%',
    },

    error: {
        color: 'red',
    },

    // ==================/==================
    // ============BUTTON STYLING===========
    // ==================/==================
    backButton: {
        position: 'absolute',
        left: spacing.md,
        top: 96,
    },
    
    button: {
        paddingHorizontal: 48,
        paddingVertical: 24,

        marginTop: 12,

        borderRadius: borderRadius.full,
        backgroundColor: colors.primary,
    },
    secundaryButton: {
        backgroundColor: colors.background,
        borderColor: colors.border,
        borderWidth: 2,
    },
    xlButton: {
        width: '100%',
    },
    buttonCopy: {
        ...typography.h4, 
        color: colors.text.secondary,
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    buttonCopySecundary: {
        color: colors.text.inverted
    },

    // ==================/==================
    // ==========INPUTFIELD STYLING=========
    // ==================/==================
    cInputField: {
        width: '100%',
    },
    inputField: {
        ...typography.body,
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: colors.secondary,
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: borderRadius.md,
    },
});