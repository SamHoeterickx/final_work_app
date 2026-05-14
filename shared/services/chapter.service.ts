// UTILS
import { graphqlFetch } from '../utils/api.utils';

// QUERIES
import { GET_CHAPTERS_QUERY } from '../graphql/query';

class ChapterService {
    async getMyChapters() {
        try {
            const response = await graphqlFetch<any>(GET_CHAPTERS_QUERY);
            console.log(response);

            const chapters = response?.getMyChapters;
            return chapters || [];
        } catch (error) {
            throw error;
        }
    }
}
export const chapterService = new ChapterService();
