import { useMutation } from "@tanstack/react-query";

// SERVICE
import { authService } from "@/shared/services/auth.service";

// TYPES
import { IRegisterVariables } from "@/shared/types/types";



export const useRegister = () => {
    return useMutation({
        mutationFn: ({ credentials, onboarding }: IRegisterVariables) => {
            return authService.register(credentials, onboarding);
        },
        onSuccess: () => {
            console.log('Register successfull');
        },
        onError: (error: Error) => {
            console.error('Register Failed', error.message);
        }
    })
}