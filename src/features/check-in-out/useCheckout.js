import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export const useCheckout = () =>{
    const queryClient = useQueryClient()
    const {mutate: checkout, isLoading: isCheckinOut, error} = useMutation({
        mutationKey:['checkout'],
        mutationFn: (bookingId)=>updateBooking(bookingId, {
            bookingStatus: 'checked-out',
        }),
        onSuccess: (data)=> {
            toast.success(`Booking #${data.id} successfully checked out `) 
            queryClient.invalidateQueries({active:true})
            
        },
        onError:()=>toast.error('There was an error during checkout')
        
    })

    return {checkout, isCheckinOut, error}
}