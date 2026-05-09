import { QUERY_KEYS } from "@/shared/const/query-keys.const"
import { chapterService } from "@/shared/services/chapter.service"
import { useQuery } from "@tanstack/react-query"

export const useGetChapters = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CHAPTERS],
        queryFn: async () => {
            const data = await chapterService.getMyChapters();
            return data ?? [];
        },
    })
}