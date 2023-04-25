import {useEffect, useState} from "react";

export default function (url, controllerRef, parseFunction = null) {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            signal: controllerRef.current.signal
        }

        fetch(url, fetchOptions)
            .then(res => res.json())
            .then(data => {
                if (parseFunction) {
                    return parseFunction(data)
                }
                return data
            })
            .then(data => setData(data))
            .catch(e => console.warn(e))
            .finally(() => setLoading(false))

        return () => {
            controllerRef.current.abort()
        }
    }, [])

    return [ data, setData, loading ]
}