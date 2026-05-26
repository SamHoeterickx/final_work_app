// UTILS
import { graphqlFetch } from '../utils/api.utils';

// QUERIES
import { GET_CHAPTERS_QUERY } from '../graphql/query';

// TYPES
import { IGetMyChaptersResponse } from '../types/response.type';

class ChapterService {
    async getMyChapters() {
        try {
            const response = await graphqlFetch<{ getMyChapters: IGetMyChaptersResponse[] }>(GET_CHAPTERS_QUERY);
            const chapters = response?.getMyChapters;
            return chapters || [];
        } catch (error) {
            throw error;
        }
    }
}
export const chapterService = new ChapterService();
