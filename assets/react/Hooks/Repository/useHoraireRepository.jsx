import httpApi from "../../Components/Utils/httpApi";
import {useState} from "react";
import handleResponse from "../../Components/Utils/handleResponse";
import parseHoraire from "../../Components/Utils/parseHoraire";

export default function (controllerRef) {

    const http = httpApi(controllerRef)
    const [ horaires, setHoraires ] = useState(null)

    const newSetHoraires = (data) => {
        setHoraires(parseHoraire(data))
    }

    const getAllParsed = () => {
        return http.get('/api/horaire')
            .then(res => handleResponse(res, newSetHoraires))
    }

    const getAll = () => {
        return http.get('/api/horaire')
            .then(res => handleResponse(res, setHoraires))
    }

    const modify = (data) => {
        return http.post('/api/admin/horaire/modify', data)
            .then(res => {
                console.log(res)
                return res
            })
            .then(res => handleResponse(res, newSetHoraires))
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