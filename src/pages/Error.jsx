import React from "react"
import { ErrorFallback } from "../ui/ErrorFallback"
import { useNavigate } from "react-router-dom"
import Button from "../ui/Button"
import Row from "../ui/Row"
import styled from "styled-components"

const Text = styled.p`
font-size:30px;
font-weight: bold;
display: flex;
align-self: center;
`;
export const Error = () => {
    const navigate = useNavigate()
    return(
        <Row>
            <Text>Error</Text>
            <Button onClick={()=>navigate('/')}>Go Back Home</Button>
        </Row>
    )
}
