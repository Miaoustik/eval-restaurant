import {useState} from "react";
import httpApi from "../../Components/Utils/httpApi";
import handleResponse from "../../Components/Utils/handleResponse";

export default function (controllerRef) {

    const [images, setImages] = useState([]);
    const http = httpApi(controllerRef);

    const getAll = () => {
        return http.get('/api/image', controllerRef)
            .then(res => {
                handleResponse(res, setImages)
            })
    }

    const save = (data) => {
        return http.post('api/admin/images/save', data, null, true)
            .then(res => handleResponse(res, setImages))
    }

    const deleteAll = () => {
        return http.get('/api/admin/images/deletebdd')
    }

    const repository = {
        getAll,
        save,
        deleteAll
    }

    return {
        images,
        repository
    }
}