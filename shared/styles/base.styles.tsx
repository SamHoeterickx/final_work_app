import { StyleSheet } from "react-native";

const PRIMARY_COLOR = '#D9D9D9';
const SECUNDARY_COLOR = 'transparant'

export const baseStyles = StyleSheet.create({
    // ==================/==================
    // =========CONTAINER STYLING===========
    // ==================/==================
    container: {
        width: '90%',
        height: '100%',
        flex: 1,
        marginHorizontal: '5%'
    },
    wrapper: {

    },
    cButton: {
        width: '100%'
    },

    // ==================/==================
    // ============TEXT STYLING=============
    // ==================/==================
    h1: {   
        fontFamily: 'Inter_900Black'
    },
    h2: {
        fontFamily: 'Inter_800ExtraBold'
    },
    h3: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
    },
    p: {
        fontFamily: 'Inter_400Regular'
    },
    link: {

    },

    // ==================/==================
    // ============BUTTON STYLING===========
    // ==================/==================
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',

        paddingVertical: 24,
        marginTop: 12,

        borderRadius: 16,

        backgroundColor: PRIMARY_COLOR,
    },
    sButton: {

    },
    xlButton: {

    },
    secundaryButton: {
        backgroundColor: SECUNDARY_COLOR,
        borderWidth: 2,
        borderColor: PRIMARY_COLOR,

    },
    buttonCopy: {
        textTransform: 'uppercase',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
    }
}) 