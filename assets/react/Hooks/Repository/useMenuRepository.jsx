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

    const createMenu = (data) => {
        return http.post('/api/admin/menu/create', data)
    }

    const deleteFormula = (data) => {
        return http.post('/api/admin/menu/delete-formula', data)
    }

    const addFormula = (data) => {
        return http.post('/api/admin/menu/add-formula', data)
    }

    const deleteMenu = (data) => {
        return http.post('/api/admin/menu/delete-menu', data)
    }

    const repository = {
        get,
        modifyMenuTitle,
        modifyMenuFormula,
        createMenu,
        deleteFormula,
        addFormula,
        deleteMenu
    }

    return {
        menus,
        setMenus,
        repository
    }

}