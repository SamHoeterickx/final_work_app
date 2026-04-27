import { FC } from "react";
import { TextInput, View } from "react-native";
import { IInputFieldProps } from "../types/types";
import { baseStyles } from "../styles/base.styles";

export const InputField: FC<IInputFieldProps> = ({onChangeText, name, placeholder, ...settings}) => {
    return(
        <View style={baseStyles.cInputField}>
            <TextInput
                style={baseStyles.inputField}
                onChangeText={(text) => onChangeText(name, text)}
                placeholder={placeholder}
                {...settings}
            />
        </View>
    )
}