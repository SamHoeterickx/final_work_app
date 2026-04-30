
import { spacing } from '@/shared/styles/design.system';
import { ELocales } from '@/shared/types/types';
import { Fontisto } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


export const LanguageButton: FC = ({}) => {

    const { i18n} = useTranslation();

    const renderCurrentLanguage = () => {
        switch(i18n.language){
            case(ELocales.EN):
                return 'English';
            case(ELocales.NL):
                return 'Nederlands';
            case(ELocales.FR):
                return 'Francais';
        }
    }

    return (
        <Link href='/(auth)/settings/changeLanguage' asChild>
            <TouchableOpacity style={styles.link}>
                <Fontisto name="world-o" size={24} color="black" />
                <Text style={styles.copy}>
                    { renderCurrentLanguage() }
                </Text>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    link: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    copy: {
        paddingLeft: spacing.sm,
        fontSize: 14,
    },
})