import React, {useRef, useState} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./Routes/Home";
import useHorairesFooter from "./Hooks/useHorairesFooter";
import Login from "./Routes/Login";
import useUser from "./Hooks/useUser";
import Inscrire from "./Routes/Inscrire";
import Menu from "./Routes/Menu";
import Carte from "./Routes/Carte";
import Reserver from "./Routes/Reserver";

export default function Router () {

    const abortRef = useRef(new AbortController())
    const [horaires, loading] = useHorairesFooter(abortRef)
    const [user, login, logout, error, loadingUser, loadingUserLogin, loadingUserLogout] = useUser(abortRef)

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home
                horaires={horaires}
                user={user}
            />
        },
        {
            path: '/login',
            element: <Login
                 horaires={horaires}
                 user={user}
                 login={login}
                 logout={logout}
                 error={error}
                 loadingLogin={loadingUserLogin}
                 loadingLogout={loadingUserLogout}
            />
        },
        {
            path: '/inscription',
            element: <Inscrire
                    horaires={horaires}
                    user={user}
                    login={login}
                    logout={logout}
            />
        },
        {
            path: '/menus',
            element: <Menu
                horaires={horaires}
                user={user}
            />
        },
        {
            path: '/carte',
            element: <Carte
                horaires={horaires}
                user={user}
            />
        },
        {
            path: '/reserver',
            element: <Reserver
                horaires={horaires}
                user={user}
            />
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