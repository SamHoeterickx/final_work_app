import { useQuery } from "@tanstack/react-query"

// SERVICES
import { chapterService } from "@/shared/services/chapter.service"

// CONST
import { QUERY_KEYS } from "@/shared/const/query-keys.const"

export const useGetChapters = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CHAPTERS],
        queryFn: async () => {
            const data = await chapterService.getMyChapters();
            return data ?? [];
        },
    })
}