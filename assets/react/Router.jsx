import React, {useRef} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./Routes/Home";
import useHorairesFooter from "./Hooks/useHorairesFooter";
import Login from "./Routes/Login";
import useUser from "./Hooks/useUser";
import Inscrire from "./Routes/Inscrire";
import Menu from "./Routes/Menu";
import Carte from "./Routes/Carte";
import Reserver from "./Routes/Reserver";
import Admin from "./Routes/Admin";

export default function Router () {

    const abortRef = useRef(new AbortController())
    const [horaires, loading] = useHorairesFooter(abortRef)
    const [user, login, logout, error, loadingUser, loadingUserLogin, loadingUserLogout, isAdmin] = useUser(abortRef)


    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home
                horaires={horaires}
                user={user}
                isAdmin={isAdmin}
            />
        },
        {
            path: '/login',
            element: <Login
                 horaires={horaires}
                 user={user}
                 isAdmin={isAdmin}
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
                    isAdmin={isAdmin}
            />
        },
        {
            path: '/menus',
            element: <Menu
                horaires={horaires}
                user={user}
                isAdmin={isAdmin}
            />
        },
        {
            path: '/carte',
            element: <Carte
                horaires={horaires}
                user={user}
                isAdmin={isAdmin}
            />
        },
        {
            path: '/reserver',
            element: <Reserver
                horaires={horaires}
                user={user}
                isAdmin={isAdmin}
            />
        },
        {
            path: '/admin',
            element: <Admin
                user={user}
                isAdmin={isAdmin}
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