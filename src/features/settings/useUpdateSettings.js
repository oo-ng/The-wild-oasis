import toast from "react-hot-toast"
import { createEditCabin } from "../../services/apiCabins"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import { updateSetting as updateSettingApi } from "../../services/apiSettings"
export const useUpdateSetting = () => {
    const queryClient = useQueryClient()
    const {isPending: isUpdating, mutate: updateSetting} = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: ()=>{
          toast.success("Setting successfully updated ")
          queryClient.invalidateQueries({
            queryKey: ['settings']
          })
          
        },
        onError: (error)=>
          toast.error(error.message)
        
    })
    return {isUpdating, updateSetting}
    
}
