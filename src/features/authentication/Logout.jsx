import { HiArrowRightOnRectangle } from "react-icons/hi2"
import Button from "../../ui/Button"
import React from 'react'
import { useLogout } from "./useLogout"
import SpinnerMini from "../../ui/SpinnerMini"
export const Logout = (children) => {
    const {logout, isLoggingOut}  = useLogout()
    return(
        <Button disabled={isLoggingOut} onClick={logout}>
             {isLoggingOut?<SpinnerMini/>:<HiArrowRightOnRectangle/>}
        </Button>
    )
}
