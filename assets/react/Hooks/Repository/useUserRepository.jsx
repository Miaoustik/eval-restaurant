import {useState} from "react";
import httpApi from "../../Components/Utils/httpApi";
import handleResponse from "../../Components/Utils/handleResponse";

export default function (controllerRef) {

    const [user, setUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [error, setError] = useState(null)
    const http = httpApi(controllerRef)

    const newSetUser = (data) => {
        const email = data.email
        const roles = data.role
        let admin = false

        if (roles !== null) {
            roles.forEach(e => {
                if (e === 'ROLE_ADMIN') {
                    admin = true
                }
            })
        }
        setUser(email)
        setIsAdmin(admin)
    }

    const get = () => {
        return http.get('/api/user')
            .then(res => handleResponse(res, newSetUser, setError))
    }

    const login = (data, controllerRef) => {
        return http.post('/api/login', data, controllerRef)
            .then(res => handleResponse(res, newSetUser, setError))
    }

    const logout = () => {
        return http.get('/api/logout')
            .then(() => get())
    }

    const register = (data, controllerRef) => {
        return http.post('/api/inscription/inscrire', data, controllerRef)
            .then(() => login({username: data.username, password: data.password}, controllerRef))
    }

    const getUserInfo = (data, controllerRef) => {
        return http.post('/api/inscription/user-info', data, controllerRef)
    }

    const repository = {
        get,
        login,
        logout,
        register,
        getUserInfo
    }

    return {
        user,
        error,
        isAdmin,
        repository
    }
}