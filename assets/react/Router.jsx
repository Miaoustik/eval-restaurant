import React, {useRef, useState} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./Routes/Home";
import useHorairesFooter from "./Hooks/useHorairesFooter";
import Login from "./Routes/Login";
import useUser from "./Hooks/useUser";

export default function Router () {

    const abortRef = useRef(new AbortController())
    const [horaires, loading] = useHorairesFooter(abortRef)
    const [user, login, logout, error, loadingUser] = useUser(abortRef)

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home horaires={horaires} />
        },
        {
            path: '/login',
            element: <Login horaires={horaires} user={user} login={login} logout={logout} error={error}/>
        }
    ])

    if (loading || loadingUser) {
        return (
            <p>Chargement...</p>
        )
    }

    return (
        <RouterProvider router={router} />
    )
}