import { useQuery } from "@tanstack/react-query"
import { getCabins } from "../../services/apiCabins"
export const useCabins = () => {
    const {isLoading, status, data: cabinData, error } = useQuery({
        queryKey:['cabins'],
        queryFn: getCabins
      })
    
      return {isLoading, status, cabinData, error}
}
