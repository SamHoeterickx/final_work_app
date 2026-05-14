import { QUERY_KEYS } from "@/shared/const/query-keys.const"
import { lessonService } from "@/shared/services/lesson.service"
import { IStartLessonCredentials } from "@/shared/types/types"
import { useQuery } from "@tanstack/react-query"

export const useStartLesson = (credentials: IStartLessonCredentials) => {
    return useQuery({
        queryKey: [QUERY_KEYS.START_LESSON, credentials],
        queryFn: () => {
            return lessonService.startLesson(credentials)
        }
    })
}