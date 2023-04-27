import {useEffect, useState} from "react";





export default function (controllerRef) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [loadingLogin, setLoadingLogin] = useState(false)
    const [loadingLogout, setLoadingLogout] = useState(false)

    useEffect(() => {
        (async () => {
            const fetchGetOptions = {
                method: 'GET',
                headers: {
                    "Accept": 'application/json'
                },
                signal: controllerRef.current.signal
            }

            try {
                const response = await fetch('/api/user', fetchGetOptions)
                const data = await response.json()

                if (Object.keys(data).length === 0) {
                    setUser(null)
                } else {
                    setUser(data)
                }
            } catch (e) {
                console.warn(e.message)
            } finally {
                setLoading(false)
            }
        })()

        return () => {
            controllerRef.current.value
        }
    }, [])

    const login = (username, password, controllerRef2 = null) => {

        (async () => {
            setLoadingLogin(true)

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

            try {
                const response = await fetch('/api/login', fetchPostOptions)
                const data = await response.json()
                setUser(data)
            } catch (e) {
                console.warn(e.message)
            } finally {
                setLoadingLogin(false)
            }
        })()
    }

    const logout = (controllerRef2 = null) => {

        (async () => {
            setLoadingLogout(true)

            const fetchOptions = {
                method: 'GET',
                headers: {
                    "Accept": "application/json"
                },
                signal: controllerRef2 ? controllerRef2.current.signal : controllerRef.current.signal
            }

            try {
                await fetch('/api/logout', fetchOptions)
                setUser(null)
            } catch (e) {
                console.warn(e.message)
            } finally {
                setLoadingLogout(false)
            }
        })()
    }

    return [user, login, logout, error, loading, loadingLogin, loadingLogout]
}