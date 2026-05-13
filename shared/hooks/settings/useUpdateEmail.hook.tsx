import { useMutation } from '@tanstack/react-query';

// SERVICES
import { authService } from '@/shared/services/auth.service';

// TYPES
import { IUpdateEmailCredentials } from '@/shared/types/types';

export const useUpdateEmail = () => {
    return useMutation({
        mutationFn: (credentials: IUpdateEmailCredentials) => {
            return authService.updateEmail(credentials);
        },
        onSuccess: () => {
            console.log('Email changed successfully');
        },
        onError: (error: Error) => {
            console.error(error.message);
        },
    });
};
