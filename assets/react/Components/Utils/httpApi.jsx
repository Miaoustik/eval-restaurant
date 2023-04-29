const getOptions = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

const postOptions = {
    method: 'POST',
    headers: {
        "Accept": 'application/json'
    }
}

export default function (controllerRef) {

    const fetchFunc = async (url, options) => {
        try {

            const response = await fetch(url, options)

            const dataObj = {
                data: null,
                ok: response.ok,
                errorCode: null,
                errorMessage: null
            }

            if (response.status !== 204) {
                dataObj.data = await response.json()
            }

            if (!response.ok) {
                dataObj.errorCode = response.status
                dataObj.errorMessage = dataObj.data.error
            }
            return dataObj
        } catch (e) {
            return setError(e)
        }
    }

    const setError = (e) => {
        console.error(e.message)
    }

    const get = (url, controller = null) => {

        const options = {
            ...getOptions,
            signal: controller?.current.signal ?? controllerRef.current.signal
        }

        return fetchFunc(url, options)
    }

    const post = async (url, data, controller = null, file = false) => {

        const fetchOptions = {
            ...postOptions,
            body: JSON.stringify(data),
            signal: controller?.current.signal ?? controllerRef.current.signal
        }

        if (!file) {
            fetchOptions.headers["Content-Type"] = 'application/json'
        }

        return fetchFunc(url, fetchOptions)
    }

    return {
        get,
        post
    }
}