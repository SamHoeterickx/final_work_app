import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, StyleSheet, Text } from 'react-native';

// TYPES
import { IHyperLinkProps } from '@/shared/types/types';

// STYLES
import { colors } from '@/shared/styles/design.system';

export const HyperLink: FC<IHyperLinkProps> = ({ path, copy }) => {
    const { t } = useTranslation();

    return (
        <Text style={styles.link} onPress={() => Linking.openURL(path)}>
            {t(copy)}
        </Text>
    );
};

const styles = StyleSheet.create({
    link: {
        color: colors.primary,
        fontWeight: 800,
    },
});
