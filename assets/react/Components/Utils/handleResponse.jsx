export default function (response, setter, setError = null) {
    if (!response.ok) {

        if (setError) {
            setError(response.errorMessage)
        }

    } else {

        if (setError) {
            setError(null)
        }

        return setter(response.data)
    }
}