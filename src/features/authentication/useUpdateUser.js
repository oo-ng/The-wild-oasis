import toast from "react-hot-toast"
import { updateCurrentUserInfo } from "../../services/apiAuth"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
export const useUpdateUser = () => {
    const queryClient = useQueryClient()
    const {isPending: isUpdatingUser, mutate: updateUser} = useMutation({
        mutationFn: ({email, password='', fullName, avatar=''})=> updateCurrentUserInfo({email, password, fullName, avatar}),
        onSuccess: ()=>{
          toast.success("User Data successfully updated ")
          queryClient.invalidateQueries({
            queryKey: ['currentUser']
          })
          
        },
        onError: (error)=>
          toast.error(error.message)
        
    })
    return {isUpdatingUser, updateUser}
    
}
