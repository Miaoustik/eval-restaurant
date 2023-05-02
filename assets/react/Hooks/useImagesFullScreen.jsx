import {useLayoutEffect, useState} from "react";

export default function (images, loadingImage = null) {

    const [showImgState, setShowImgState] = useState({})

    const handleShowImage = (e) => {
        e.preventDefault()
        setShowImgState(s => {
            const newState = {...s}
            const id = e.target.getAttribute('data-id')
            newState[id] = true
            document.body.style.overflow = "hidden";
            return newState
        })
    }

    const handleCloseImage = (e) => {
        e.preventDefault()
        setShowImgState(s => {
            const newState = {...s}
            const id = e.target.getAttribute('data-id')
            newState[id] = false
            document.body.style.overflow = "auto";
            return newState
        })
    }

    useLayoutEffect(() => {
        if (images.length > 0 && !loadingImage) {
            setShowImgState(() => {
                const newState = {}
                    images.forEach(e => {
                        newState[e.id] = false
                    })
                return newState
            })
        }
    }, [images])


    return {
        showImgState,
        handleShowImage,
        handleCloseImage
    }
}