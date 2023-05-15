import {useState} from "react";
import httpApi from "../../Components/Utils/httpApi";

export default function (controllerRef) {

    const [maxCustomer, setMaxCustomer] = useState(null)
    const http = httpApi(controllerRef)

    const get = () => {
        return http.get('/api/max')
            .then(res => {
               setMaxCustomer(res.data)
            })
    }


    const repository = {
        get
    }

    return {
        maxCustomer,
        repository
    }
}