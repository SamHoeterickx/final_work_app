import { useMutation } from '@tanstack/react-query';

// SERVICES
import { authService } from '@/shared/services/auth.service';

// TYPES
import { INewPasswordCredentials } from '@/shared/types/types';

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (credentials: INewPasswordCredentials) => {
            return authService.changePassword(credentials);
        },
        onSuccess: () => {
            console.log('Password changed successfully');
        },
        onError: (error: Error) => {
            console.error('Failed to change password', error.message);
        },
    });
};
