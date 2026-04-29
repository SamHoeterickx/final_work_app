import { authService } from "@/shared/services/auth.service"
import { IChangePasswordWithResetCodeCredentials } from "@/shared/types/types"
import { useMutation } from "@tanstack/react-query"

export const useChangePasswordWithResetCode = () => {
    return useMutation({
        mutationFn: (credentials: IChangePasswordWithResetCodeCredentials) => {
            return authService.changePasswordWithResetCode(credentials);
        },
        onSuccess: () => {
            console.log('Password changed successfully')
        },
        onError: (error: Error) => {
            console.error('Failed to change password', error.message);
        }
    })
}