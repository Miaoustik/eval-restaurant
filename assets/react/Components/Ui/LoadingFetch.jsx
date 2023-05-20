import React from "react";

export default function ({message, className = null}) {
    return (
        <div className={"d-flex align-items-center justify-content-center px-5 my-5 " + className }>
            <strong>{message}</strong>
            <div className="spinner-border ms-auto" role="status"
                 aria-hidden="true"></div>
        </div>
    )
}