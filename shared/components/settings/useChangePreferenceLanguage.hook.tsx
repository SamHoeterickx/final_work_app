import { authService } from "@/shared/services/auth.service"
import { ELocales } from "@/shared/types/enums"
import { useMutation } from "@tanstack/react-query"

export const useChangePreferenceLanguage = () => {
    return useMutation({
        mutationFn: async (locale: ELocales) => {
            console.log(locale)
            await authService.updatePreferenceLanguage(locale);
        },
        onSuccess: () => {
            
        },
        onError: () => {

        }
    })
}