import React from "react"
import Button from "../../ui/Button"
import CreateCabinForm from "./CreateCabinForm"
import  Modal  from "../../ui/Modal"

export const AddCabin = () => {
    return(
        <div>
            <Modal>
                <Modal.Open opens="cabin-form">
                    <Button>Add new Cabin</Button>
                </Modal.Open>
                <Modal.Window name="cabin-form">
                    <CreateCabinForm/>
                </Modal.Window>
            </Modal>
        </div>
    )

}
