import { onboardingService } from "@/shared/services/onboarding.service";
import { useMutation } from "@tanstack/react-query"

export const useGenerateCustomRoadmap = () => {
    return useMutation({
        mutationFn: () => {
            return onboardingService.generateCustomRoadmap();
        },
        onSuccess: () => {
            console.log('Login successfull');
        },
        onError: (error: Error) => {
            console.error('Login Failed', error.message);
        },
    })
}