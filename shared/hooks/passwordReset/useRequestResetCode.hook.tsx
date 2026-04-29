import { authService } from "@/shared/services/auth.service"
import { IRequestResetCodeCredentials } from "@/shared/types/types"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "expo-router";

export const useRequestResetCode = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (credentials: IRequestResetCodeCredentials) => {
            return authService.requestResetCode(credentials);
        },
        onSuccess: () => {
            console.log('Reset Code successfully send');
            router.navigate('/(auth)/verifyResetCode')
        },
        onError: (error: Error) => {
            console.error('Login Failed', error.message);
        }
    })
}