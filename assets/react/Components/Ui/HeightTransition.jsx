import React from "react";
import styled, {keyframes} from "styled-components";

export default function ({children, show = false, className, start = false}) {

    if (start) {
        return <DivStart show={show === true ? '1' : '0'} >
            <SecondDiv>
                {children}
            </SecondDiv>
        </DivStart>
    }

    return (
        <Div className={className} show={show === true ? '1' : '0'}>
            <SecondDiv>
                {children}
            </SecondDiv>
        </Div>
    )
}

const animOnLoad = keyframes`
    from {
        grid-template-rows: 0fr;
    }
    
    to {
        grid-template-rows: 1fr;
    }
`

const Div = styled.div`
    display: grid;
    grid-template-rows: 0fr;
    ${props => props.show === '1' && 'grid-template-rows: 1fr;'}
    transition: grid-template-rows 0.5s ease-out;
`

const DivStart = styled.div`
    display: grid;
    grid-template-rows: 0fr;
    ${props => props.show === '1' && 'grid-template-rows: 1fr;'}
    transition: grid-template-rows 0.5s ease-out;
    animation: ${animOnLoad} 0.5s ease-out;
`

const SecondDiv = styled.div`
    overflow: hidden;
`