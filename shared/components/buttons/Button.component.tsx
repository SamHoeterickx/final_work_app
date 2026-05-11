import { Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';

// STYLES
import { baseStyles } from '@/shared/styles/design.system';

// TYPES
import { IButtonProps } from '@/shared/types/types';

// ICONS
import { SvgIcon } from '../SvgIcon.component';

export const Button: FC<IButtonProps> = ({ copy, icon, styles, size, onPress, ...settings }) => {
    const { t } = useTranslation();

    const renderButtonStyles = () => {
        let customStyles: any[] = [];

        if (styles === 'secundary') {
            customStyles.push(baseStyles.secundaryButton);
        }
        if (size === 'large') {
            customStyles.push(baseStyles.xlButton);
        }

        return customStyles;
    };
    return (
        <TouchableOpacity
            style={[baseStyles.button, renderButtonStyles()]}
            onPress={onPress}
            {...settings}
        >
            <Text
                style={[
                    baseStyles.buttonCopy,
                    styles === 'secundary' ? baseStyles.buttonCopySecundary : '',
                ]}
            >
                {t(copy)}
            </Text>
            {icon && <SvgIcon name={icon} width={12} height={12} color={'#FFFFFF'} />}
        </TouchableOpacity>
    );
};
