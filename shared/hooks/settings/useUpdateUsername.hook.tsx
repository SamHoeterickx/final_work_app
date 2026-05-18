import { useMutation } from '@tanstack/react-query';

// SERVICES
import { authService } from '@/shared/services/auth.service';

// TYPES
import { IUpdateUsernameCredentials } from '@/shared/types/types';

export const useUpdateUsername = () => {
    return useMutation({
        mutationFn: (credentials: IUpdateUsernameCredentials) => {
            return authService.updateUsername(credentials);
        },
        onSuccess: () => {
            console.log('Username changed successfully');
        },
        onError: (error: Error) => {
            console.error('Failed to change username', error.message);
        },
    });
};
