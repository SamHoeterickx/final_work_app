import { authService } from '@/shared/services/auth.service';
import { IRequestResetCodeCredentials } from '@/shared/types/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

export const useRequestResetCode = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (credentials: IRequestResetCodeCredentials) => {
            return authService.requestResetCode(credentials);
        },
        onSuccess: (_, credentials) => {
            console.log('Reset Code successfully sent');

            router.navigate({
                pathname: '/(auth)/(forgotPassword)/verifyResetCode',
                params: { email: credentials.email },
            });
        },
        onError: (error: Error) => {
            console.error('Request Failed', error.message);
        },
    });
};
