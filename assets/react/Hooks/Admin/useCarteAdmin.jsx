import {useEffect, useRef} from "react";
import useHeightTransition from "../useHeightTransition";

export default function (carte, repository, setCarte, categories) {


    const inputsRef = useRef({})

    const catRef = useRef()

    const {show: showCategory, toggleShow: toggleShowCategory} = useHeightTransition()
    const {show: showModify, toggleShow: toggleShowModify, setShow: setShowModify} = useHeightTransition()
    const {show: showDelete, toggleShow: toggleShowDelete, setShow: setShowDelete} = useHeightTransition()


    useEffect(() => {
        repository.get()
    }, [])

    const handleSubmitNewCat = (e) => {
        e.preventDefault()
        const data = {
            name: catRef.current.value
        }
        console.log(data)

        repository.createCategory(data)
            .then((res) => {
                setCarte(prev => {
                    const news = [...prev]
                    news.push(res.data)
                    return news
                })
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const id = e.target.getAttribute('data-id')

        const data = {
            id,
            title: inputsRef.current[id].title.value,
            description: inputsRef.current[id].description.value,
            price: inputsRef.current[id].price.value,
            category: inputsRef.current[id].category.value
        }

        repository.modify(data)
            .then(res => {
                if (res.ok) {
                    setCarte(prev => {
                        const news = [...prev]
                        news.forEach(el => {
                            el.dishes.forEach((ell, kk) => {
                                if (ell.id == id) {
                                    el.dishes.splice(kk, 1)
                                }
                            })
                        })

                        news.forEach((el, k) => {
                            if (el.id == res.data.category.id) {
                                el.dishes.push({
                                    id: res.data.id,
                                    title: res.data.title,
                                    description: res.data.description,
                                    price: res.data.price,
                                })
                            }
                        })
                        return news
                    })
                    setShowModify(prev => {
                        const news = {...prev}
                        news[id] = false
                        return news
                    })
                }
            })
    }

    const handleDelete = (e) => {
        e.preventDefault()
        const id = e.target.getAttribute('data-id')

        repository.deleteDish({id})
            .then(res => {
                if (res.ok) {
                    setCarte(prev => {
                        const n = [...prev]
                        n.forEach(el => {
                            el.dishes.forEach((ell, kk) => {
                                if (ell.id == id) {
                                    el.dishes.splice(kk, 1)
                                }
                            })
                        })
                        return n
                    })
                }
            })
    }

    return {
        carte,
        showCategory,
        toggleShowCategory,
        showModify,
        toggleShowModify,
        categories,
        handleSubmit,
        inputsRef,
        handleDelete,
        showDelete,
        toggleShowDelete,
        catRef,
        handleSubmitNewCat
    }
}