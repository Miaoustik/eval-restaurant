import {useState} from "react";
import httpApi from "../../Components/Utils/httpApi";
import handleResponse from "../../Components/Utils/handleResponse";

export default function (controllerRef) {


    const [carte, setCarte] = useState([])
    const [error, setError] = useState(null)
    const http = httpApi(controllerRef)

    const get = () => {
        return http.get('/api/carte')
            .then(res => handleResponse(res, setCarte, setError))
    }

    const modify = (data) => {
        return http.post('/api/admin/carte/modify', data)
    }

    const createDish = (data) => {
        return http.post('/api/admin/carte/create-dish', data)
    }

    const deleteDish = (id) => {
        return http.post('/api/admin/carte/delete-dish', id)
    }

    const repository = {
        get,
        modify,
        createDish,
        deleteDish
    }

    return {
        carte,
        setCarte,
        error,
        setError,
        repository
    }
}