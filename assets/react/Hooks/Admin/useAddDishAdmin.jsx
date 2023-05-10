import {useRef, useState} from "react";
import useHeightTransition from "../useHeightTransition";

export default function (carte, repository, setCarte, categories) {


    const inputsNewRef = useRef({})
    const [created, setCreated] = useState(false)

    const {show, toggleShow} = useHeightTransition()


    const handleAddNewDish = (e) => {
        e.preventDefault()
        toggleShow(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setCreated(false)
        const data = {
            id: e.target.getAttribute('data-id'),
            title: inputsNewRef.current['1'].title.value,
            description: inputsNewRef.current['1'].description.value,
            price: inputsNewRef.current['1'].price.value,
            category: inputsNewRef.current['1'].category.value,
        }

        repository.createDish(data)
            .then(res => {

                setCarte(prev => {
                    const n = [...prev]
                    n.forEach(el => {
                        if (res.data.category.id == el.id) {
                            el.dishes.push({
                                id: res.data.id,
                                price: res.data.price,
                                description: res.data.description,
                                title: res.data.title,
                            })
                        }
                    })
                    return n
                })
                inputsNewRef.current['1'].title.value = ''
                inputsNewRef.current['1'].description.value = ''
                inputsNewRef.current['1'].price.value = ''
                inputsNewRef.current['1'].category.value = ''
                setCreated(true)
            })
    }

    const closeAlert = (e) => {
        e.preventDefault()
        setCreated(false)
    }

    return {
        handleAddNewDish,
        inputsNewRef,
        categories,
        show,
        handleSubmit,
        created,
        closeAlert
    }
}