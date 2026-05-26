import { COMPLETE_LESSON_MUTATION } from '../graphql/mutations';
import { START_LESSON_QUERY } from '../graphql/query';
import { ICompleteLessonResponse, IStartLessonResponse } from '../types/response.type';
import { ILessonCredentials } from '../types/types';
import { graphqlFetch } from '../utils/api.utils';

class LessonService {
    async startLesson(credentials: ILessonCredentials) {
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

    async completeLesson(credentials: ILessonCredentials) {
        try {
            const response = await graphqlFetch<{ completeLesson: ICompleteLessonResponse }>(
                COMPLETE_LESSON_MUTATION,
                {
                    ...credentials,
                },
            );
            return response?.completeLesson;
        } catch (error) {
            throw error;
        }
    }
}

export const lessonService = new LessonService();
