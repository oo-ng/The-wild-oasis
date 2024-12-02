import styled from "styled-components";
import { Link } from "react-router-dom";
import React from "react";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  console.log(activity)
  const { id, bookingStatus, Guests, noOfNights } = activity;

  return (
    <StyledTodayItem>
      {bookingStatus === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {bookingStatus === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Flag src={Guests.countryFlag} alt={`Flag of ${Guests.country}`} />
      <Guest>{Guests.name}</Guest>
      <div>{noOfNights} nights</div>

      {bookingStatus === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {bookingStatus === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
