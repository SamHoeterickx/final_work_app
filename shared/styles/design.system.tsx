import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';

export const colors = {
    primary: '#465E3C',
    secondary: '#222222',
    background: '#E8DFD3',
    darkBackground: '#D6D0C9',

    text: {
        primary: '#222222',
        secondary: '#FFFFFF',
        muted: '#696969',
        inverted: '#465E3C',
    },

    success: '#',
    warning: '#',
    error: '#A63C3C',

    border: '#465E3C',
    shadow: '#000000',
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
        fontFamily: 'Vanguard-DemiBold',
        fontSize: 48,
        color: colors.text.primary,
        textTransform: 'uppercase',
    },
    h2: {
        fontFamily: 'Vanguard-DemiBold',
        fontSize: 36,
        color: colors.text.primary,
        textTransform: 'uppercase',
    },
    h3: {
        fontFamily: 'Vanguard-DemiBold',
        fontSize: 20,
        color: colors.text.primary,
        textTransform: 'uppercase',
    },
    h4: {
        fontFamily: 'Vanguard-Regular',
        fontSize: 20,
        color: colors.text.primary,
        textTransform: 'uppercase',
    },
    body: {
        fontFamily: 'helvetica',
        fontSize: 14,
        color: colors.text.primary,
    },
    bodySmall: {
        fontFamily: 'helvetica',
        fontSize: 14,
        color: colors.text.primary,
    },
    caption: {
        fontFamily: 'helvetica',
        fontSize: 12,
        letterSpacing: 0.3,
        color: colors.text.muted,
    },
    link: {
        fontFamily: 'Vanguard-Regular',
        fontSize: 14,
        color: colors.text.muted,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
};

export const shadows = {
    button: {
        shadowColor: colors.shadow,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
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
    cScrollView: {
        flex: 1,
        width: '100%',
    },
    cAuth: {
        width: '90%',
    },

    logo: {
        width: '65%',
        marginTop: spacing.lg,
    },

    // Typography (Hooks into the typography object above)
    h1: { ...typography.h1 } as TextStyle,
    h2: { ...typography.h2 } as TextStyle,
    h3: { ...typography.h3 } as TextStyle,
    h4: { ...typography.h4 } as TextStyle,
    p: { ...typography.body } as TextStyle,
    a: { ...typography.link } as TextStyle,
    caption: { ...typography.caption } as TextStyle,

    inputGroup: {
        marginBottom: spacing.lg,
    } as ViewStyle,

    errorText: {
        ...typography.bodySmall,
        color: colors.error,
        marginTop: spacing.xs,
        textAlign: 'center',
    } as TextStyle,

    wrapper: {},

    // ==================/==================
    // ============BUTTON STYLING===========
    // ==================/==================
    backButton: {
        position: 'absolute',
        left: spacing.md,
        top: Platform.OS === 'ios' ? 96 : 72,
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,

        paddingHorizontal: 48,
        paddingVertical: 24,

        marginTop: 12,
        marginBottom: Platform.OS === 'android' ? 12 : 0,

        borderRadius: borderRadius.full,
        backgroundColor: colors.primary,
        ...shadows.button,
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
        ...typography.h3,
        color: colors.text.secondary,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    buttonCopySecundary: {
        color: colors.text.inverted,
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
        paddingHorizontal: 16,
        backgroundColor: colors.background,
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: borderRadius.full,
    },
});
