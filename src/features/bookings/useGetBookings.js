import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export const useGetBookings = () => {
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    //Filtering 
    const filterValue = searchParams.get('bookingStatus') || 'all'
    const filter = filterValue === 'all'? null : {field: 'bookingStatus', value: filterValue, method: 'eq'}

    //sorting 
    const sortValue = searchParams.get('sortBy') || 'startDate-asc'
    const [field, direction] = sortValue.split('-')
    const sort= {field: field, direction: direction}

    //pagination
    const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

    //query
    const {isLoading, data, error, status } = useQuery({
        queryKey:["bookings", filter, sort, currentPage],
        queryFn: ()=>getAllBookings({filter, sort, currentPage})
    })
    const bookingData = data?.data||[]
    const bookingDataCount = data?.count||0

    //prefetching 
    let pageCount = Math.ceil(bookingDataCount/PAGE_SIZE)
    if(currentPage<pageCount){
        queryClient.prefetchQuery({
            queryKey:["bookings", filter, sort, currentPage+1],
            queryFn: ()=>getAllBookings({filter, sort, currentPage : currentPage+1})
        })
    }
    if(currentPage>1){
        queryClient.prefetchQuery({
            queryKey:["bookings", filter, sort, currentPage-1],
            queryFn: ()=>getAllBookings({filter, sort, currentPage : currentPage-1})
        })
    }


    return {isLoading, bookingDataCount, bookingData, error, status}
}
