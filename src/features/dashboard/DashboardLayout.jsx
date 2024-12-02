import styled from "styled-components";
import { useRecentBookings } from "./userecentBookings";
import Spinner from "../../ui/Spinner";
import React from "react";
import { useRecentStays } from "./useRecentStay";
import { Stats } from "./Stats";
import { useCabins } from "../cabins/useCabins";
import { SalesChart } from "./SalesChart";
import { DurationChart } from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export const DashboardLayout = () => {
  const {isLoadingBookings, bookings, recentBookingError} = useRecentBookings()
  const {isLoadingStays, stays, recentStaysError, confirmedStays, numDays} = useRecentStays()
  const {cabinData, isLoading} = useCabins()
  if(isLoadingBookings || isLoadingStays )return <Spinner/>
  return(
    <StyledDashboardLayout>
      <Stats bookings = {bookings} confirmedStays={confirmedStays} numOfDays={numDays} cabinCount={cabinData?.length} />
      <TodayActivity/>
      <DurationChart confirmedStays={confirmedStays}/>
      <SalesChart bookings={bookings} numDays={numDays}/>
      
    </StyledDashboardLayout>
  )
}
