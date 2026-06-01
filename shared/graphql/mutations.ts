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
        $onboarding: OnboardingInput!,
        $language: String!
    ) {
        registerUser(
            input: {
                email: $email,
                name: $name,
                password: $password,
                repeatPassword: $repeatPassword,
                onboarding: $onboarding,
                language: $language
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
        generateCustomRoadmap {
            uuid
            slug
            name
            description
            tags
            lessons {
                uuid
                order
                translations {
                    languageCode
                    name
                    description
                }
            }
            created_at
        }
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

export const UPDATE_PASSWORD_MUTATION = `
    mutation ResetPassword(
        $oldPassword: String!,
        $newPassword: String!,
        $repeatNewPassword: String!,

    ) {
        resetPassword(
            input: { 
                newPassword: $newPassword, 
                repeatNewPassword: $repeatNewPassword, 
                oldPassword: $oldPassword }
        ) {
            accessToken
            refreshToken
        }
    }
`;

export const UPDATE_PREFERENCE_LANGUAGE_MUTATION = `
    mutation UpdatePreferenceLanguage(
        $language: String!
    ) {
        updatePreferenceLanguage(
        input: { 
            language: $language 
        })
    }
`;

export const COMPLETE_LESSON_MUTATION = `
    mutation CompleteLesson(
        $lessonUuid: String!
        $languageCode: String!
    ) {
        completeLesson(input: { 
            lessonUuid: $lessonUuid,
            languageCode: $languageCode
        }) {
            success
            alreadyCompleted
            message
            newUserXP
            prevUserXP
            isStreakUpdated
            newStreak
            prevStreak
            streak {
                currentStreak
                lastCompletedDate
                longestStreak
                uuid
            }
            newUnlockedLesson {
                status
                uuid
                translations {
                    name
                    languageCode
                    description
                }
            }
            isLastLesson
            newUnlockedChapter {
                uuid
                slug
                name
                description
            }
        }
    }

`;
