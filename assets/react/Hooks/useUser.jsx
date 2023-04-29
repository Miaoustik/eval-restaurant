import {useEffect, useState} from "react";
import httpApi from "../Components/Utils/httpApi";

export default function (controllerRef) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingLogin, setLoadingLogin] = useState(false)
    const [loadingLogout, setLoadingLogout] = useState(false)
    const [loadingRegister, setLoadingRegister] = useState(false)
    const [error, setError] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false);
    const http = httpApi(controllerRef)

    function setUserFetch (res) {

        if (!res.ok) {
            setError(res.errorMessage)
        } else {
            setError(null)
            const email = res.data.email
            const roles = res.data.role

            if (roles !== null) {
                roles.forEach(e => {
                    if (e === 'ROLE_ADMIN') {
                        setIsAdmin(true)
                    }
                })
            }
            setUser(email)
        }
    }

    useEffect(() => {

        setLoading(true)

        http.get('/api/user')
            .then(res => setUserFetch(res))
            .finally(() => setLoading(false))

    }, [])

    // !!!

    const login = (data, controllerRef = null) => {

        setLoadingLogin(true)
        http.post('/api/login', data, controllerRef)
            .then(res => setUserFetch(res))
            .finally(() => setLoadingLogin(false))

    }

    const logout = () => {
        setLoadingLogout(true)
        http.get('/api/logout')
            .finally(() => setLoadingLogout(false))

    }

    const register = (data, controllerRef) => {
        setLoadingRegister(true)
        http.post('/api/inscription/inscrire', data, controllerRef)
            .then(res => {
                if (!res.ok) {
                    setError(res.errorMessage)
                } else {
                    setError(null)
                    login({
                        username: data.username,
                        password: data.password
                    }, controllerRef)
                }
            })
            .finally(() => setLoadingRegister(false))

    }

    return {
        user,
        login,
        logout,
        register,
        error,
        loading,
        loadingLogin,
        loadingLogout,
        loadingRegister,
        isAdmin
    }
}