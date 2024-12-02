/* eslint-disable react/prop-types */
import React from "react"
import Stat from "./Stat"
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2"
import { formatCurrency } from "../../utils/helpers"
export const Stats = ({bookings, confirmedStays, numOfDays, cabinCount}) => {
    const numberOfBookings = bookings.length
    console.log(bookings)
    const totalSales = bookings.reduce((acc, cur)=> acc+ cur.totalPrice,0)
    const checkins = confirmedStays.length
    const occupancy = confirmedStays.reduce((acc,cur)=> 
        acc + cur.noOfNights,0
    ) / (numOfDays*cabinCount)
    const occupancyRate = Math.round(occupancy* 100) 

    return(
       <>
        <Stat title = 'Bookings' color = 'blue' icon = {<HiOutlineBriefcase/>} value={numberOfBookings}/>
        <Stat title = 'Sales' color = 'green' icon= {<HiOutlineBanknotes/>} value={formatCurrency(totalSales)}/>
        <Stat title = 'Check ins' color = 'indigo' icon= {<HiOutlineCalendarDays/>} value={checkins}/>
        <Stat title = 'Occupancy Rate' color = 'yellow' icon= {<HiOutlineChartBar/>} value={occupancyRate + '%'}/>
        
       </>
    )
}
