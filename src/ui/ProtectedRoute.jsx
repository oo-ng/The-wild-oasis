import styled from "styled-components"
import { useGetCurrentUser } from "../features/authentication/useGetCurrentUser"
import Spinner from "./Spinner"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50)l;
    display: flex;
    align-items: center;
    justify-content: center;

`
export const ProtectedRoute = ({children}) => {
    const navigate = useNavigate()
    //Load authenticates user 
    const {isLoading, user, isAuthenticated} = useGetCurrentUser()
    //Show Spinner
    //If no authenticated user direct to login 
    useEffect(()=>{
        if(!isAuthenticated && !isLoading){
            navigate('/login')
        }
    },[isAuthenticated, isLoading, navigate])

    if(isLoading){
        return <FullPage> <Spinner/> </FullPage>}
        
    //if there is render app
    if(isAuthenticated){
        return(
            children
        )
    }
    
}
