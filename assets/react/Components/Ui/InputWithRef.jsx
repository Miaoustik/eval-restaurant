import React from "react";
import styled from "styled-components";

export default React.forwardRef(function ({ type, label, placeholder, autofocus = false, required = false, autocomplete = true }, ref) {
    return (
        <div className={'mt-4'}>
            <label className={'mukta text-primary mb-2'}>{label}</label>
            <Input ref={ref} name={type} required={required} className={'form-control border border-primary border-1 bg-transparent'} placeholder={placeholder} type={type} autoFocus={autofocus} autoComplete={autocomplete.toString()}/>
        </div>
    )
})

const Input = styled.input`
    &::placeholder {
        color: var(--bs-primary) !important;
    }
`