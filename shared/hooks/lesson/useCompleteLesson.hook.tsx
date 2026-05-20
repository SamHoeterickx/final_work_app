import { lessonService } from "@/shared/services/lesson.service"
import { ILessonCredentials } from "@/shared/types/types"
import { useMutation } from "@tanstack/react-query"

export const useCompleteLesson = () => {
    return useMutation({
        mutationFn: (credentials: ILessonCredentials) => {
            const response = lessonService.completeLesson(credentials);
            console.log('---complete lesson response', response);
            return response
        },
        onSuccess: () => {
            console.log('Successfully complete lesson')
        },
        onError: (error: Error) => {
            console.error('Failed to complete lesson', error.message);
        },
    })
}