// MUTATIONS
import { GENERATE_CUSTOM_ROADMAP_MUTATION } from '../graphql/mutations';

// TYPES
import { IGenerateCustomRoadmapResponse } from '../types/response.type';

// UTILS
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
