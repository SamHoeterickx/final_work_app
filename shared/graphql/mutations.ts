export const LOGIN_USER_MUTATION = `
	mutation LoginUser($email: String!, $password: String!) {
		loginUser(input: { email: $email, password: $password }) {
			accessToken
			refreshToken
		}
	}
`;

export const REGISTER_USER_MUTATION = `
    mutation RegisterUser(
        $email: String!,
        $name: String!,
        $password: String!,
        $repeatPassword: String!,
        $onboarding: OnboardingInput!
    ) {
        registerUser(
            input: {
                email: $email,
                name: $name,
                password: $password,
                repeatPassword: $repeatPassword,
                onboarding: $onboarding
            }
        ) {
            accessToken
            refreshToken
        }
    }
`;
