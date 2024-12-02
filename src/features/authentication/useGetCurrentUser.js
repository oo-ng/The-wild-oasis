import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "../../services/apiAuth"

export const useGetCurrentUser = () => {
    const {isLoading, data: user, error } = useQuery({
        queryKey:['currentUser'],
        queryFn: ()=> getCurrentUser()
    })
    return({isLoading, user, isAuthenticated: user?.role === 'authenticated'})
}
