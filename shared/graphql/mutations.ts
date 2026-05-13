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

export const LOGOUT_MUTATION = `
    mutation LogOut {
        logOut
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

export const GENERATE_CUSTOM_ROADMAP_MUTATION = `
    mutation GenerateCustomRoadmap {
        generateCustomRoadmap
    }
`;

export const DELETE_USER_MUTATION = `
    mutation DeleteUser($password: String!) {
        deleteUser(input: { 
            password: $password
        })
    }
`;
export const UPDATE_USERNAME_MUTATION = `
    mutation updateUserName($updatedUsername: String!) {
        updateUserName(input: { 
            updatedUsername: $updatedUsername
        })
    }
`;
export const UPDATE_EMAIL_MUTATION = `
    mutation UpdateEmail($updatedEmailAdress: String!) {
        updateEmail(input: { 
            updatedEmailAdress: $updatedEmailAdress
        })
    }
`;
