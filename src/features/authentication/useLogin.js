import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi} from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {mutate: login, isLoading:isLoggingIn, error } = useMutation({
        mutationKey:['login'],
        mutationFn: ({email, password})=> loginApi({email, password}),

        onSuccess:(user)=> {
            console.log('user', user)
            queryClient.setQueryData(['currentUser'], user.user)
            toast.success("Login Successful.")
            navigate('/' ,{replace:true})
            
        },
        onError: (error)=>{
            toast.error(`${error.message}`)
            console.error(error.message)
        }
    })
    return {login, isLoggingIn }
}