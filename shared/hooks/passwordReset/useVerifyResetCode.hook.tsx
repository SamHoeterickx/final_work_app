import { authService } from "@/shared/services/auth.service"
import { IVerifyResetCodeCredentials } from "@/shared/types/types"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "expo-router"

export const useVerifyResetCode = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (credentials: IVerifyResetCodeCredentials) => {
            return authService.verifyResetCode(credentials);
        },
        onSuccess: (_, credentials) => {
            console.log('Reset Code successfully verified');
            router.navigate({
                pathname: '/(auth)/resetPassword',
                params: {email: credentials.email, resetCode: credentials.resetCode}
            })
        },
        onError: (error: Error) => {
            console.error('Verification Failed', error.message);
        }
    })
}