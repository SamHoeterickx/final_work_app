import { StyleProp, ViewStyle } from "react-native";

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
	extensions?: {
		code?: string;
	};
};

export type TGraphQLResponse<T = unknown> = {
	data?: T;
	errors?: TGraphQLError[];
};

// PROPS
export interface IButtonProps{
    copy: string;
    styles?: 'primary' | 'secundary';
    size?: 'small' | 'normal' | 'large'
    onPress: () => void;
}

