import {useEffect, useState} from "react";
import useUserRepository from "./Repository/useUserRepository";

export default function (controllerRef) {

    const {
        user,
        error,
        repository,
        isAdmin
    } = useUserRepository(controllerRef)

    const [loading, setLoading] = useState(true)
    const [loadingLogin, setLoadingLogin] = useState(false)
    const [loadingLogout, setLoadingLogout] = useState(false)
    const [loadingRegister, setLoadingRegister] = useState(false)


    useEffect(() => {
        repository.get()
            .finally(() => setLoading(false))
    }, [])

    const login = (data, controllerRef = null) => {

        setLoadingLogin(true)
        repository.login(data, controllerRef)
            .finally(() => setLoadingLogin(false))

    }

    const logout = () => {
        setLoadingLogout(true)
        repository.logout()
            .finally(() => setLoadingLogout(false))

    }

    const register = (data, controllerRef) => {
        setLoadingRegister(true)
        repository.register(data, controllerRef)
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
        isAdmin,
        repository
    }
}