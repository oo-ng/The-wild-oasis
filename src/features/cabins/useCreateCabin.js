import toast from "react-hot-toast"
import { createEditCabin } from "../../services/apiCabins"
import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
export const useCreateCabin = () =>{
    const queryClient = useQueryClient()
    const {isPending: isCreating, mutate: createCabin} = useMutation({
        mutationFn: (data)=> createEditCabin(data),
        onSuccess: ()=>{
            toast.success("New Cabin successfully created")
            
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            })
            
        },
        onError: (error)=>
            toast.error(error.message)
        
    })

    return {isCreating, createCabin}
}