import { getSettings } from "../../services/apiSettings"
import { useQuery } from "@tanstack/react-query"

export const useSettings = () => {
    const {isPending, error, data: settingsData} = useQuery({
        queryKey:['settings'],
        queryFn: getSettings
    })
    return {isPending, error, settingsData}
}

