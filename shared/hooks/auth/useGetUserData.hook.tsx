import { useQuery } from "@tanstack/react-query"

// SERVICE
import { authService } from "@/shared/services/auth.service"

// CONST
import { QUERY_KEYS } from "@/shared/const/query-keys.const"

export const useGetUserdata = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USER_DATA],
        queryFn: async () => {
            const response = await authService.getUserData();

            const responseData = response?.data as any;
            return responseData.data.getUserData
        }
    })
}