export const LOGIN_USER = `
	mutation LoginUser($email: String!, $password: String!) {
		loginUser(input: { email: $email, password: $password }) {
			accessToken
			refreshToken
		}
	}
`;
