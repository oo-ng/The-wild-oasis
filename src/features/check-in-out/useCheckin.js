import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export const useCheckin = () =>{
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {mutate: checkin, isLoading: isCheckinIn, error} = useMutation({
        mutationKey:['checkin'],
        mutationFn: ({bookingId, breakfast})=>updateBooking(bookingId, {
            isPaid: true,
            bookingStatus: 'checked-in',
            ...breakfast
        }),
        onSuccess: (data)=> {
            console.log('Test', data )
            toast.success(`Booking #${data.id} successfully checked in `) 
            queryClient.invalidateQueries({active:true})
            navigate('/')
        },
        onError:()=>toast.error('There was an error while checkin in')
        
    })

    return {checkin, isCheckinIn, error}
}