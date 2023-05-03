import React from "react";
import styled from "styled-components";

export default React.forwardRef(function ({state , id, children}, ref) {
    return (
        <ClickShow ref={(el) => ref.current[id] = el} data-id={id} height={state[id]?.height} show={state[id]?.show === undefined  ? '3' : (state[id]?.show ? '1' : '0')}>
            {children}
        </ClickShow>
    )
})

const ClickShow = styled.div`
    overflow: hidden;
    max-height: ${props => props.show === '3' ? 'auto' : (props.show === '0' ? '0' : (props.height.toString() + 'px'))};
    transition: max-height 0.8s ease;
`