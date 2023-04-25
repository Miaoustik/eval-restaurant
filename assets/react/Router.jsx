import React, {useRef} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./Routes/Home";
import useHorairesFooter from "./Hooks/useHorairesFooter";
import Login from "./Routes/Login";

export default function Router () {

    const abortRef = useRef(new AbortController())
    const [horaires, loading] = useHorairesFooter(abortRef)

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home horaires={horaires} />
        },
        {
            path: '/login',
            element: <Login horaires={horaires} />
        }
    ])

    if (loading) {
        return (
            <p>Chargement...</p>
        )
    }

    return (
        <RouterProvider router={router} />
    )
}