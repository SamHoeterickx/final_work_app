import { useMutation } from '@tanstack/react-query';

// SERVICE
import { authService } from '@/shared/services/auth.service';

// TYPES
import { ILoginCredentials } from '@/shared/types/types';

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: ILoginCredentials) => {
      return authService.login(credentials);
    },
    onSuccess: () => {
      console.log('Login successfull');
    },
    onError: (error: Error) => {
      console.error('Login Failed', error.message);
    },
  });
};
