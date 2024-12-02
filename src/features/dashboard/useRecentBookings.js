import { useQuery, useQueryClient } from "@tanstack/react-query"
import { subDays } from "date-fns"
import { useSearchParams } from "react-router-dom"
import { getBookingsAfterDate } from "../../services/apiBookings"

export const useRecentBookings = () =>{
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const numDays = searchParams.get('last')?Number(searchParams.get('last')): 7
    let queryDate = subDays(new Date(), numDays).toISOString()
    const {isLoading: isLoadingBookings, data: bookings, error: recentBookingError } = useQuery({
        queryFn:()=>getBookingsAfterDate(queryDate),
        queryKey: ['bookings', `last-${numDays}`],
        onSuccess:()=>queryClient.invalidateQueries(['bookings'])
    })
    return {isLoadingBookings, bookings, recentBookingError}
}