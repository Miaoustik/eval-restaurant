import httpApi from "../../Components/Utils/httpApi";
import {useState} from "react";
import handleResponse from "../../Components/Utils/handleResponse";

export default function (controllerRef) {

    const http = httpApi(controllerRef)
    const [rotation, setRotation] = useState(null)

    const get = (data) => {
        return http.post('/api/rotation', data)
            .then(res => {
                console.log(res)
                return res
            })
            .then(res => handleResponse(res, setRotation))
    }

    const repository = {
        get
    }

    return {
        rotation,
        repository
    }
}