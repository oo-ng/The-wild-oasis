import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2"
import React from "react"
import Button from "./Button"
import { useDarkMode } from "../context/darkModeContext"

export const DarkModeToggle = () => {
    const {isDarkMode , toggleDarkMode} = useDarkMode()
    return(
        <Button variations = 'secondary' onClick={toggleDarkMode} >
            {isDarkMode?<HiOutlineMoon/>: <HiOutlineSun/>}
        </Button>
    )
}
