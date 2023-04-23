import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./Routes/Home";


export default function Router () {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}