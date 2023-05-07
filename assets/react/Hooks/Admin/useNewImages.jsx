import {useEffect, useLayoutEffect, useRef, useState} from "react";
import useImagesFullScreen from "../useImagesFullScreen";
import useHeightTransition from "../useHeightTransition";

export default function (images, loadingImage, repository, setInputLoaded) {

    const timerRef = useRef(null)
    const fileInputRef = useRef()
    const newImagesInputRef = useRef([])
    const [newImages, setNewImages] = useState([])
    const [input, setInput] = useState('')
    const [uploading, setUploading] = useState(false)
    const {show, toggleShow, setShow, start} = useHeightTransition( true)

    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current)
        }
    })

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
        if (newImages.length > 0) {
            setShow(prev => {
                const id = newImages[newImages.length - 1].id
                const news = {...prev}
                news[id] = true
                return news
            })

        }
    }, [newImages])


    const deleteNew = async (e) => {
        e.preventDefault()
        const id = e.target.getAttribute('data-id')

        setShow(prevState => {
            const news = {...prevState}
            news[id] = false
            return news
        })

        //TODO timeOut not working

        timerRef.current = setTimeout(() => {
            console.log('hello')
            setNewImages(prevState => {
                console.log(id, e.id)
                const newState = [...prevState]
                newState.forEach((e, k) => {
                    if (e.id == id) {
                        newState.splice(k, 1)
                    }
                })
                return newState
            })
        }, 500)
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
        start
    }
}