import styled from "styled-components";
import React from "react";
import {formatCurrency} from '../../utils/helpers'
import Row from "../../ui/Row";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { Table } from "../../ui/Table";
import { Menus } from "../../ui/Menus";



const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export const CabinRow = ({cabin}) => {
  const {isDeleting, deleteCabin} = useDeleteCabin()
  const{isCreating, createCabin} = useCreateCabin()

 
  const {
    id:cabinID, 
    name, 
    image, 
    maxCapacity, 
    regularPrice, 
    discount,
    description
  } = cabin

  const handleDuplicate = () =>{
    createCabin({
      name: `Copy  of ${name}`,image, 
      maxCapacity, 
      regularPrice, 
      discount,
      description
    })
  }

  return(
    <>
      <Table.Row>
        <Img src={image}/>
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? <Discount>{formatCurrency(discount)}</Discount>: <span>&mdash;</span>}
        <div>            
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinID}/>
              <Menus.List id={cabinID}>
                <Menus.Button onClick={(handleDuplicate)} disabled={isCreating} icon={<HiSquare2Stack/>}>Duplicate</Menus.Button>
                
                <Modal.Open opens='edit'>
                  <Menus.Button icon={<HiPencil/>}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens='delete-cabin'>
                  <Menus.Button icon={<HiTrash/>}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name='edit'>
                {<CreateCabinForm cabinToEditData={cabin}/>}
              </Modal.Window>

              <Modal.Window name='delete-cabin'>
                <ConfirmDelete resourceName={name} disabled={isDeleting} onConfirm={()=>deleteCabin(cabinID)}/>
              </Modal.Window>
            </Menus.Menu>
          </Modal>
            
          
        </div>
      </Table.Row>
    </>
      
    
  )
}
