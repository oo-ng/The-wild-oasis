import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query"
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins"
import toast from "react-hot-toast"
export const useDeleteCabin = () =>{
    const queryClient = useQueryClient()
    const {mutate: deleteCabin, isPending: isDeleting} =  useMutation({
        mutationFn:(id)=>deleteCabinApi(id), 
        onSuccess: ()=>{
            toast.success("Cabin deleted successfully"),
            queryClient.invalidateQueries({
                queryKey: ["cabins"]
            })},
            onError:(err)=>{
                toast.error(err.message)
            }
        }

    )
    return({isDeleting, deleteCabin})
}