import httpApi from "../../Components/Utils/httpApi";
import {useState} from "react";
import handleResponse from "../../Components/Utils/handleResponse";

export default function (controllerRef) {

    const http = httpApi(controllerRef)
    const [ horaires, setHoraires ] = useState(null)


    const getAllParsed = (parseFunction) => {

        const newSetHoraires = (data) => {
            setHoraires(parseFunction(data))
        }

        return http.get('/api/horaire')
            .then(res => handleResponse(res, newSetHoraires))
    }

    const getAll = () => {
        return http.get('/api/horaire')
            .then(res => handleResponse(res, setHoraires))
    }

    const modify = (data) => {
        return http.post('/api/admin/horaire/modify', data)
    }

    const repository = {
        getAll,
        getAllParsed,
        modify
    }

    return {
        horaires,
        repository
    }

}