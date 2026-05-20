import { START_LESSON_QUERY } from '../graphql/query';
import { IStartLessonCredentials, IStartLessonResponse } from '../types/types';
import { graphqlFetch } from '../utils/api.utils';

class LessonService {
    async startLesson(credentials: IStartLessonCredentials) {
        try {
            const response = await graphqlFetch<{ startLesson: IStartLessonResponse }>(
                START_LESSON_QUERY,
                { ...credentials },
            );
            console.log('---startLesson', response);
            return response?.startLesson;
        } catch (error) {
            throw error;
        }
    }
}

export const lessonService = new LessonService();
