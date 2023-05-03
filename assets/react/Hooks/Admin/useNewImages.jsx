import {useEffect, useRef, useState} from "react";
import useImagesFullScreen from "../useImagesFullScreen";

export default function () {
    const fileInputRef = useRef()
    const newImagesInputRef = useRef([])
    const [newImages, setNewImages] = useState([])
    const [input, setInput] = useState('')

    const {
        showImgState: showNewImgState,
        handleShowImage: handleShowNewImage,
        handleCloseImage: handleCloseNewImage
    } = useImagesFullScreen(images, loadingImage)

    const handleAddImage = (e) => {
        e.preventDefault()
        fileInputRef.current.click()
    }
    const handleInput = (e) => {
        setInput(e.target.value)
    }

    useEffect(() => {
        if (input !== '') {

            const file = fileInputRef.current.files[0]
            const reader = new FileReader()
            reader.onloadend = e => {
                setNewImages(prevState => {
                    const newState = [...prevState]
                    let id
                    if (newState.length === 0) {
                        id = 1
                    } else {
                        id = prevState[prevState.length - 1].id + 1
                    }
                    newState.push({
                        id: id,
                        file: file,
                        title: '',
                        base64: e.target.result
                    })
                    return newState
                })
                setInput('')
            }
            reader.readAsDataURL(file)
        }
    }, [input])


    const deleteNew = (e) => {
        e.preventDefault()
        const id = e.target.getAttribute('data-id')
        setNewImages(prevState => {
            const newState = [...prevState]
            newState.forEach((e, k) => {
                if (e.id == id) {
                    newState.splice(k, 1)
                }
            })
            return newState
        })
    }

    const handleNewSubmit = (e) => {
        e.preventDefault()
        console.log(newImages, newImagesInputRef.current)
        //!!!!!!!
    }

    return {
        handleAddImage,

    }
}