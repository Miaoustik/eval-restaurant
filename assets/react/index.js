import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from "./Router";

const reactElement = document.getElementById('root')
const index = ReactDOM.createRoot(reactElement)

index.render (
    <>
        <Router {...(reactElement.dataset)} />
    </>
)