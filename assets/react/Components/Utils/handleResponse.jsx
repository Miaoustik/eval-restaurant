export default function (response, setter, setError = null) {
    if (!response.ok) {

        console.log(response.errorMessage)

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