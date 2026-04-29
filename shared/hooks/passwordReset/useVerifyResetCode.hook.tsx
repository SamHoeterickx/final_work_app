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
        onSuccess: () => {
            console.log('Reset Code successfully verified');
            router.navigate('/(auth)/resetPassword')
        },
        onError: (error: Error) => {
            console.error('Verification Failed', error.message);
        }
    })
}