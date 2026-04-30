import { FC } from "react";
import { Text, TouchableOpacity } from "react-native";
import { baseStyles } from "../styles/design.system";
import { IButtonProps } from "../types/types";
import { useTranslation } from "react-i18next";

export const Button: FC<IButtonProps> = ({ copy, styles, size, onPress, ...settings }) => {

    const { t } = useTranslation();

    const renderButtonStyles = () => {
        let customStyles: any[] = [];

        if(styles === 'secundary'){
            customStyles.push(baseStyles.secundaryButton);
        }
        if(size === 'small'){
            customStyles.push(baseStyles.sButton);
        }else if(size === 'large'){
            customStyles.push(baseStyles.xlButton);
        }

        return customStyles;
    }

    return (
        <TouchableOpacity
            style={[baseStyles.button, renderButtonStyles()]}
            onPress={onPress}
            {...settings}
        >
            <Text style={baseStyles.buttonCopy}>{(t(copy))}</Text>
        </TouchableOpacity>
    )
}