import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout as logoutApi} from "../../services/apiAuth"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export const useLogout = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {mutate: logout, isLoading: isLogginOut} = useMutation({
        mutationFn: ()=> logoutApi(),
        onSuccess:()=>{ 
            navigate('/login', {replace: true})
            toast.success("Logout Successful")
            queryClient.removeQueries()
        },
        onError:(error)=>{
            toast.error(`${error.message}`)
            console.error(error.message)
        }
    })

    return {isLogginOut, logout}


}
