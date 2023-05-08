import {useEffect, useRef, useState} from "react";
import useCarteRepository from "../Repository/useCarteRepository";
import useControllerRef from "../useControllerRef";
import useHeightTransition from "../useHeightTransition";

export default function () {

    const controllerRef = useControllerRef()
    const {carte, error, repository} = useCarteRepository(controllerRef)
    const inputsRef = useRef({})

    const categories = carte.map(el => {
        return {
            id: el.id,
            name: el.name
        }
    })

    const {show: showCategory, toggleShow: toggleShowCategory} = useHeightTransition()
    const {show: showModify, toggleShow: toggleShowModify} = useHeightTransition()

    useEffect(() => {
        repository.get()
    }, [])

    useEffect(() => {
        if (Object.keys(carte).length > 0) {

        }
    }, [carte])

    const handleSubmit = (e) => {
        e.preventDefault()
        const id = e.target.getAttribute('data-id')

        //if empty ('', and cat = 'default')

        const data = {
            id,
            title: inputsRef.current[id].title.value,
            description: inputsRef.current[id].description.value,
            price: inputsRef.current[id].price.value,
            category: inputsRef.current[id].category.value
        }

        repository.modify(data)
            .then(res => console.log(res.data))
    }

    return {
        carte,
        showCategory,
        toggleShowCategory,
        showModify,
        toggleShowModify,
        categories,
        handleSubmit,
        inputsRef
    }
}