import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./Routes/Home";
import useHorairesFooter from "./Hooks/useHorairesFooter";
import Login from "./Routes/Login";
import useUser from "./Hooks/useUser";
import Inscrire from "./Routes/Inscrire";
import Menu from "./Routes/Menu";
import Carte from "./Routes/Carte";
import Reserver from "./Routes/Reserver";
import useControllerRef from "./Hooks/useControllerRef";
import AdminImage from "./Routes/Admin/AdminImage";
import AdminCarte from "./Routes/Admin/AdminCarte";

export default function Router () {

    const controllerRef = useControllerRef()
    const [horaires, loading] = useHorairesFooter(controllerRef)

    const {
        user,
        loading: loadingUser,
        login,
        logout,
        register,
        loadingRegister,
        loadingLogin,
        loadingLogout,
        error,
        isAdmin
    } = useUser(controllerRef)


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
                 loadingLogin={loadingLogin}
                 loadingLogout={loadingLogout}
            />
        },
        {
            path: '/inscription',
            element: <Inscrire
                    horaires={horaires}
                    user={user}
                    register={register}
                    loadingRegister={loadingRegister}
                    isAdmin={isAdmin}
                    error={error}
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
            path: '/admin/image',
            element: <AdminImage
                user={user}
                isAdmin={isAdmin}
                horaires={horaires}
            />
        },
        {
            path: '/admin/carte',
            element: <AdminCarte
                user={user}
                isAdmin={isAdmin}
                horaires={horaires}
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