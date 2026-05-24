import { GENERATE_CUSTOM_ROADMAP_MUTATION } from '../graphql/mutations';
import { IGenerateCustomRoadmapResponse } from '../types/types';
import { graphqlFetch } from '../utils/api.utils';

class OnboardingService {
    async generateCustomRoadmap() {
        try {
            return await graphqlFetch<{ generateCustomRoadmap: IGenerateCustomRoadmapResponse }>(
                GENERATE_CUSTOM_ROADMAP_MUTATION,
            );
        } catch (error) {
            throw error;
        }
    }
}
export const onboardingService = new OnboardingService();
