import { QUERY_KEYS } from '@/shared/const/query-keys.const';
import { lessonService } from '@/shared/services/lesson.service';
import { ILessonCredentials } from '@/shared/types/types';
import { useQuery } from '@tanstack/react-query';

export const useStartLesson = (credentials: ILessonCredentials) => {
    return useQuery({
        queryKey: [QUERY_KEYS.START_LESSON, credentials],
        queryFn: () => {
            return lessonService.startLesson(credentials);
        },
    });
};
