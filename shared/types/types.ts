import { StyleProp, TextInputProps, TouchableOpacityProps, ViewStyle } from "react-native";

// INTERFACES
export interface ILoginCredentials {
	email: string;
	password: string;
}

export interface IAuthStore {
	accessToken: string | null;
	refreshToken: string | null;
    isHydrated: boolean;
	setTokens: (accessToken: string, refreshToken: string) => void;
	logout: () => void;
    setHydrated: (state: boolean) => void;
}
 
export interface IRefreshTokensResponse {
	refreshTokens: {
		accessToken: string;
		refreshToken: string;
	};
};

export interface ILoginUserResponse {
	loginUser: {
		accessToken: string;
		refreshToken: string;
	};
};


// TYPES
export type TTokenRefreshSubscriber = (token: string | null) => void;

export type TGraphQLError = {
	message: string;
};

export type TGraphQLResponse<T = unknown> = {
	data?: T;
	errors?: TGraphQLError[];
};

// PROPS
export interface IButtonProps extends TouchableOpacityProps {
    copy: string;
    styles?: 'primary' | 'secundary';
    size?: 'small' | 'normal' | 'large'
    onPress: () => void;
}

export interface IInputFieldProps extends Omit<TextInputProps, 'onChangeText'>{
    onChangeText: (name: string, value: string) => void;
    placeholder: string;
    name: string;
}