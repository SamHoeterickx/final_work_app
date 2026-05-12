import { GENERATE_CUSTOM_ROADMAP } from '../graphql/mutations';
import { graphqlFetch } from '../utils/api.utils';

class OnboardingService {
    async generateCustomRoadmap() {
        try {
            const response = await graphqlFetch<any>(GENERATE_CUSTOM_ROADMAP);
            console.log(response);

            const success = response.generateCustomRoadmap;

            if (!success) throw new Error('Failed to generate custom roadmap');
            return success;
        } catch (error) {
            throw error;
        }
    }
}
export const onboardingService = new OnboardingService();
