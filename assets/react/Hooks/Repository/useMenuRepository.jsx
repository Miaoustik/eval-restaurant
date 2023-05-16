import httpApi from "../../Components/Utils/httpApi";
import {useState} from "react";

export default function (controllerRef) {

    const http = httpApi(controllerRef)
    const [menus, setMenus] = useState([])

    const get = () => {
        return http.get('/api/menu')
    }

    const modifyMenuTitle = (data) => {
        return http.post('/api/admin/menu/modify-title', data)
    }
    const modifyMenuFormula = (data) => {
        return http.post('/api/admin/menu/modify-formula', data)
    }


    const repository = {
        get,
        modifyMenuTitle,
        modifyMenuFormula
    }

    return {
        menus,
        setMenus,
        repository
    }

}