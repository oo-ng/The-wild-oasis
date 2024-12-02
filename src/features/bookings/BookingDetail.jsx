import styled from "styled-components";
import React from "react";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const status = "checked-in";

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const navigate = useNavigate()

  const {booking ={}, isLoading } = useBooking()
  const {checkout, isCheckinOut} = useCheckout()
  const {deleteBooking, isDeletingBooking} = useDeleteBooking()
  if (isLoading||isCheckinOut||isDeletingBooking) return <Spinner/>

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[booking.bookingStatus]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {booking.bookingStatus==='unconfirmed'&&
        <Button onClick={()=>navigate(`/checkin/${booking.id}`)} >
          <HiArrowDownOnSquare/>
              Check in
        </Button>}
      {booking.bookingStatus==='checked-in'&&
        <Button onClick={()=>checkout(booking.id)}>
          <HiArrowUpOnSquare/>
              Check out
        </Button>}

        <Modal>
          <Modal.Open>
            <Button disabled={isDeletingBooking} variations='danger'>
            <HiArrowUpOnSquare/>
              Delete
            </Button>
          </Modal.Open>
          <Modal.Window>
            <ConfirmDelete resourceName={`Booking ${booking.id}`} onConfirm={()=>deleteBooking(booking.id, {onSettled:()=>navigate(-1)})}/>
          </Modal.Window>
        </Modal>

      <ButtonGroup>
        <Button variations="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
