import { FC } from 'react';
import { TextInput, View } from 'react-native';

// TYPES
import { IInputFieldProps } from '@/shared/types/types';

// STYLES
import { baseStyles, colors } from '@/shared/styles/design.system';

export const InputField: FC<IInputFieldProps> = ({
    onChangeText,
    name,
    placeholder,
    style,
    ...settings
}) => {
    return (
        <View style={baseStyles.cInputField}>
            <TextInput
                style={[baseStyles.inputField, style]}
                onChangeText={(text) => onChangeText(name, text)}
                placeholder={placeholder}
                placeholderTextColor={colors.text.muted}
                {...settings}
            />
        </View>
    );
};
