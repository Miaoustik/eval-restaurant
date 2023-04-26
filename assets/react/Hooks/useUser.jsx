import {useEffect, useState} from "react";





export default function (controllerRef, username, password) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        const fetchGetOptions = {
            method: 'GET',
            headers: {
                "Accept": 'application/json'
            },
            signal: controllerRef.current.signal
        }

        fetch('/api/user', fetchGetOptions)
            .then(res => {
                return res.json()
            })
            .then(data => {
                if (Object.keys(data).length === 0) {
                    setUser(null)
                } else {
                    setUser(data)
                }
            })
            .catch(error => console.warn(error))
            .finally(() => setLoading(false))

        return () => {
            controllerRef.current.value
        }
    }, [])

    const login = (username, password, controllerRef2 = null) => {

        const fetchPostOptions = {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            }),
            signal: controllerRef2 ? controllerRef2.current.signal : controllerRef.current.signal
        }

        fetch('/api/login', fetchPostOptions)
            .then(res => {
                if (res.status === 401) {
                    setError("Identifiants invalides.")
                    return null
                }
                return res.json()
            })
            .then(data => {
                setUser(data)
            })
            .catch(() => {
                setError('Erreur avec la requête.')
            })
    }

    const logout = (controllerRef2 = null) => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                "Accept": "application/json"
            },
            signal: controllerRef2 ? controllerRef2.current.signal : controllerRef.current.signal
        }

        fetch('/api/logout', fetchOptions)
            .then(() => {
                setUser(null)
            })
            .catch(() => console.log('error'))

    }

    return [user, login, logout, error, loading]
}