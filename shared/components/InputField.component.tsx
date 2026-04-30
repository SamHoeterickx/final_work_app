import { FC } from 'react';
import { TextInput, View } from 'react-native';

import { baseStyles } from '@/shared/styles/design.system';
import { IInputFieldProps } from '@/shared/types/types';

export const InputField: FC<IInputFieldProps> = ({onChangeText, name, placeholder, style, ...settings}) => {
    return(
        <View style={baseStyles.cInputField}>
            <TextInput
                style={[baseStyles.inputField, style]}
                onChangeText={(text) => onChangeText(name, text)}
                placeholder={placeholder}
                {...settings}
            />
        </View>
    )
}