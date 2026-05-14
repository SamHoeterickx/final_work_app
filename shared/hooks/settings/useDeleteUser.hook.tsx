import { useMutation } from '@tanstack/react-query';

// SERVICES
import { authService } from '@/shared/services/auth.service';

// TYPES
import { IDeleteUserCredentials } from '@/shared/types/types';

export const useDeleteUser = () => {
    return useMutation({
        mutationFn: (credentials: IDeleteUserCredentials) => {
            return authService.deleteUser(credentials);
        },
        onSuccess: () => {
            console.log('Deleted user successfully');
        },
        onError: (error: Error) => {
            console.error(error.message);
        },
    });
};
