import React from "react";
import styled from "styled-components";

export default React.forwardRef(function ({state, toggleShow , id, name, children}, ref) {
    return (
        <ContainerDiv>
            <ButtonShow show={state[id]?.show === undefined  ? '3' : (state[id]?.show ? '1' : '0')} data-id={id} onClick={toggleShow}>{name}</ButtonShow>
            <ClickShow ref={(el) => ref.current[id] = el} data-id={id} height={state[id]?.height} show={state[id]?.show === undefined  ? '3' : (state[id]?.show ? '1' : '0')}>
                {children}
            </ClickShow>
        </ContainerDiv>
    )
})

const ContainerDiv = styled.div`
    margin-bottom: 1rem;
    border-radius: 15px;
    border: solid 1px var(--bs-primary)
`

const ButtonShow = styled.button`
    background-color: transparent;
    border: none;
    width: 100%;
    text-align: start;
    padding: 1rem;
    border: none; 
`

const ClickShow = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    overflow: hidden;
    max-height: ${props => props.show === '3' ? 'auto' : (props.show === '0' ? '0' : (props.height.toString() + 'px'))};
    transition: max-height 0.8s ease;
`