import toast from "react-hot-toast"
import { createEditCabin } from "../../services/apiCabins"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
export const useEditCabin = () => {
    const queryClient = useQueryClient()
    const {isPending: isEditing, mutate: editCabin} = useMutation({
        mutationFn: ({newCabinData, id})=> createEditCabin(newCabinData, id),
        onSuccess: ()=>{
          toast.success("Cabin successfully edited ")
          queryClient.invalidateQueries({
            queryKey: ['cabins']
          })
          
        },
        onError: (error)=>
          toast.error(error.message)
        
    })
    return {isEditing, editCabin}
    
}
