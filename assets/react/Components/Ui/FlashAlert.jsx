import React from "react";

export default function ({type = 'info', message, handleClick}) {
    return (
        <div role={'button'} onClick={handleClick} className={'alert alert-' + type}>
            {message}
        </div>
    )
}