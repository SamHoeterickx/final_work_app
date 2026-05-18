import { START_LESSON_QUERY } from '../graphql/query';
import { IStartLessonCredentials } from '../types/types';
import { graphqlFetch } from '../utils/api.utils';

class LessonService {
    async startLesson(credentials: IStartLessonCredentials) {
        try {
            console.log({ ...credentials });
            const startLesson = await graphqlFetch<any>(START_LESSON_QUERY, { ...credentials });

            return startLesson?.startLesson;
        } catch (error) {
            throw error;
        }
    }
}

export const lessonService = new LessonService();
