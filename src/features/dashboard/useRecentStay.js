import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query"
import { subDays } from "date-fns"
import { useSearchParams } from "react-router-dom"
import { getStaysAfterDate } from "../../services/apiBookings"

export const useRecentStays = () =>{
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const numDays = searchParams.get('last')?Number(searchParams.get('last')): 7
    let queryDate = subDays(new Date(), numDays).toISOString()
    const {isLoading: isLoadingStays, data: stays, error: recentStaysError } = useQuery({
        queryFn:()=>getStaysAfterDate(queryDate),
        queryKey: ['stays', `last-${numDays}`],
        onSuccess: ()=>queryClient.invalidateQueries(['stays'])
    })
    const confirmedStays = stays?.filter((stay)=>stay.bookingStatus === 'checked-in'||'checked-out')
    return { isLoadingStays, stays, confirmedStays, recentStaysError, numDays}
}