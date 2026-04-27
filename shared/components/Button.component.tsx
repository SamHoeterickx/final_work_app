import { FC } from "react";
import { Text, TouchableOpacity } from "react-native";
import { baseStyles } from "../styles/base.styles";
import { IButtonProps } from "../types/types";

export const Button: FC<IButtonProps> = ({ copy, styles, size, onPress }) => {

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
        >
            <Text style={baseStyles.buttonCopy}>{copy}</Text>
        </TouchableOpacity>
    )
}