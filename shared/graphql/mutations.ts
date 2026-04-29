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

export const REQUEST_RESET_CODE_MUTATION = `
    mutation LoginUser(
        $email: String!
    ) {
        forgotPasswordRequest(
            input: {
                email: $email
            }
        )
    }
`;

export const VERIFY_RESET_CODE_MUTATION = `
    mutation VerifyPasswordResetCode(
        $email: String!,
        $resetCode: String!
    ) {
        verifyPasswordResetCode(
            input: {
                email: $email,
                resetCode: $resetCode
            }
        )    
    }
`;

export const RESET_PASSWORD_WITH_RESET_CODE_MUTATION = `
	mutation ResetPasswordWithCode(
		$resetCode: String!,
		$email: String!,
		$newPassword: String!,
		$repeatNewPassword: String!
	) {
		resetPasswordWithCode(
			input: {
				resetCode: $resetCode,
				email: $email,
				newPassword: $newPassword,
				repeatNewPassword: $repeatNewPassword
			}
		) {
			accessToken
			refreshToken
		}
	}
`;
