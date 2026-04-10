export interface ILoginCredentials {
	email: string;
	password: string;
}

export interface IAuthStore {
	accessToken: string | null;
	refreshToken: string | null;
	setTokens: (accessToken: string, refreshToken: string) => void;
	logout: () => void;
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

