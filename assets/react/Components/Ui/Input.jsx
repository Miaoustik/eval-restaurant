import React from "react";
import styled from "styled-components";

export default function ({ type, label, placeholder = null, autofocus = false, rows = null, required = false, autocomplete = true, min = null, max = null, className = null }) {


    if (type === 'number') {
        return (
            <div>
                <label className={'mukta text-primary mb-2'}>{label}</label>
                <Input name={type} min={min} max={max} required={required} className={'form-control border border-primary border-1 shadow1 ' + className} type={type} autoFocus={autofocus}/>
            </div>
        )
    }

    if (type === 'textarea') {
        return <div>
            <label className={'mukta text-primary mb-2'}>{label}</label>
            <Input rows={rows} name={type} required={required} className={'form-control border border-primary border-1 shadow1 ' + className} placeholder={placeholder} type={type} autoFocus={autofocus} autoComplete={autocomplete.toString()}/>
        </div>
    }


    return (
        <div>
            <label className={'mukta text-primary mb-2'}>{label}</label>
            <Input name={type} required={required} className={'form-control border border-primary border-1 shadow1 ' + className} placeholder={placeholder} type={type} autoFocus={autofocus} autoComplete={autocomplete.toString()}/>
        </div>
    )
}

const Input = styled.input`
    &::placeholder {
        color: var(--bs-primary) !important;
    };
`
