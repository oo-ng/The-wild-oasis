import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useDeleteBooking = () =>{
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const {mutate: deleteBooking, isLoading: isDeletingBooking, error} = useMutation({
        mutationKey:['bookings'],
        mutationFn:(id)=>deleteBookingApi(id),

        onSuccess: ()=> {
            toast.success(`Booking successfully deleted`)
            queryClient.invalidateQueries({active: true})

        },

        onError:()=>{
            console.error(error)
        }
    })
    return {deleteBooking, isDeletingBooking, error}

}