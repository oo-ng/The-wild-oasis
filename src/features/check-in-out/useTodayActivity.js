import { useQuery } from "@tanstack/react-query"
import { getStaysTodayActivity } from "../../services/apiBookings"
export const useTodayActivity = () => {
    const {isLoading, status, data: todayActivityData, error } = useQuery({
        queryKey:['today-activity'],
        queryFn: getStaysTodayActivity
      })
    
      return {isLoading, status, todayActivityData, error}
}
