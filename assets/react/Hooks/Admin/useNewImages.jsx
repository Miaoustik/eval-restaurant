import {useEffect, useLayoutEffect, useRef, useState} from "react";
import useImagesFullScreen from "../useImagesFullScreen";
import useHeightTransition from "../useHeightTransition";
import useFlashAlert from "../useFlashAlert";

export default function (images, loadingImage, repository, setInputLoaded) {

    const fileInputRef = useRef()
    const newImagesInputRef = useRef([])
    const [newImages, setNewImages] = useState([])
    const [input, setInput] = useState('')
    const [uploading, setUploading] = useState(false)
    const {show, toggleShow, setShow, start} = useHeightTransition( true)
    const [unset, setUnset] = useState(null)
    const {show: showValidate, setShow: setShowValidate} = useHeightTransition()
    const [submitted, setSubmitted] = useState(false)

    const {showAlert, setShowAlert, handleCloseFlash} = useFlashAlert()

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

    useLayoutEffect(() => {
        if (submitted === true) {
            setShowAlert(true)
        }
    }, [submitted])

    useLayoutEffect(() => {
        if (newImages.length > 0) {
            setShow(prev => {
                const id = newImages[newImages.length - 1].id
                const news = {...prev}
                news[id] = true
                return news
            })
            setShowValidate(true)
        } else {
            setShowValidate(false)
        }
    }, [newImages])

    useEffect(() => {
        let timer = null
        if (unset) {
            timer = setTimeout(() => {
                setNewImages(prevState => {
                    const newState = [...prevState]
                    newState.forEach((e, k) => {
                        if (e.id == unset) {
                            newState.splice(k, 1)
                        }
                    })
                    setUnset(null)
                    return newState
                })
            }, 500)
        }

        return () => clearTimeout(timer)
    }, [unset])


    const deleteNew = async (e) => {
        e.preventDefault()
        const id = e.target.getAttribute('data-id')

        setShow(prevState => {
            const news = {...prevState}
            news[id] = false
            return news
        })
        setUnset(id)
    }

    const handleNewSubmit = (e) => {
        e.preventDefault()
        setUploading(true)
        const data = new FormData()
        newImages.forEach(el => {
            data.append('file-' + el.id, el.file, el.file.name)
            data.append('title-' + el.id, newImagesInputRef.current[el.id].value )
        })
        setInputLoaded(false)
        repository.save(data)
            .then((res) => {
                console.log(res)
                if (res.ok) {
                    setSubmitted(true)
                }
            })
            .finally(() => {
                setNewImages([])
                setUploading(false)
            })
    }

    return {
        handleAddImage,
        handleInput,
        deleteNew,
        showNewImgState,
        handleShowNewImage,
        handleCloseNewImage,
        newImages,
        fileInputRef,
        newImagesInputRef,
        handleNewSubmit,
        uploading,
        show,
        setShow,
        toggleShow,
        start,
        showValidate,
        submitted,
        showAlert,
        handleCloseFlash
    }
}