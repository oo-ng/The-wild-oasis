import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signUp as signUpApi} from "../../services/apiAuth"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export const useSignUp = () => {
    // const queryClient = useQueryClient()
    // const navigate = useNavigate()
    const {mutate: signUp, isLoading: isSigningUp} = useMutation({
        mutationFn: ({fullName, email, password })=> signUpApi({email, password, options:{data:{fullName: fullName}} }),
        onSuccess:(user)=>{ 
            console.log(user)
            toast.success("User Sign Up Successful")
            // queryClient.removeQueries()
        },
        onError:(error)=>{
            toast.error(`${error.message}`)
            console.error(error.message)
        }
    })

    return {isSigningUp, signUp}


}
