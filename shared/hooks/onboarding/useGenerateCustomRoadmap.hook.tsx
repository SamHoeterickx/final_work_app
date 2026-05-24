import { useAuthStore } from '@/shared/context/authStore.context';
import { onboardingService } from '@/shared/services/onboarding.service';
import { useMutation } from '@tanstack/react-query';

export const useGenerateCustomRoadmap = () => {
    const { setRoadmapResponse } = useAuthStore();

    return useMutation({
        mutationFn: async () => {
            const response = await onboardingService.generateCustomRoadmap();

            if (!response) {
                throw new Error('Failed to generate custom roadMap');
            }
            setRoadmapResponse(response.generateCustomRoadmap);

            return response;
        },
        onSuccess: () => {
            console.log('Generated custom roadmap successfull');
        },
        onError: (error: Error) => {
            console.error(error.message);
        },
    });
};
