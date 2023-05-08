import {useLayoutEffect, useState} from "react";
import useImagesFullScreen from "../useImagesFullScreen";
import useHeightTransition from "../useHeightTransition";

export default function (images, loadingImage, repository, setImages, setRefreshImg) {
    const [titlesState, setTitlesState] = useState({})
    const [inputLoaded, setInputLoaded] = useState(false)
    const {show: show, toggleShow: toggleShow, setShow: setShow} = useHeightTransition()
    const {show: showMain, toggleShow: toggleShowMain, setShow: setShowMain} = useHeightTransition()
    const {show: showModify, toggleShow: toggleShowModify, setShow: setShowModify} = useHeightTransition()
    const {show: showTitle, setShow: setShowTitle} = useHeightTransition()
    const {show: showDelete, toggleShow: toggleShowDelete, setShow: setShowDelete} = useHeightTransition()

    const {
        showImgState,
        handleShowImage,
        handleCloseImage
    } = useImagesFullScreen(images, loadingImage)

    useLayoutEffect(() => {
        if (images.length > 0 && !loadingImage) {
            setInputLoaded(false)
            setTitlesState(() => {
                const news = {}
                images.forEach(e => {
                    news[e.id] = ''
                })
                return news
            })
            setInputLoaded(true)
        }
    }, [images])

    const handleTitleState = (e) => {

        const id = e.target.getAttribute('data-id')

        setTitlesState(prev => {
            const news = {...prev}
            news[id] = e.target.value
            return news
        })

        setShowTitle(prev => {
            const news = {...prev}
            news[id] = e.target.value !== '';
            return news
        })
    }

    const customToggleShow = (e) => {
        e.preventDefault()
        toggleShowMain(e)

        const id = e.target.getAttribute('data-id')

        function setFalseFunc (setter, id) {
            setter(prev => {
                const news = {...prev}
                news[id] = false
                return news
            })
        }

        if (showMain[id] === true) {

            setFalseFunc(setShowTitle, id)
            setFalseFunc(setShowModify, id)
            setFalseFunc(setShowDelete, id)

            setTitlesState(prev => {
                const news = {...prev}
                news[id] = ''
                return news
            })
        }
    }

    const handleDeleteBtn = (e) => {
        e.preventDefault()
        toggleShowDelete(e)
    }

    const handleDeleteImage = (e) => {

        e.preventDefault()
        const id = e.target.getAttribute('data-id')
        repository.deleteById(id)
            .then(res => {
                console.log(res)
                if (res.ok) {
                    setRefreshImg(s => !s)

                    //TODO unset e.id of all refs
                }
            })
    }

    const handleModifyTitle = (e) => {
        e.preventDefault()
        toggleShowModify(e)
        const id = e.target.getAttribute('data-id')


        setTitlesState(prev => {
            const news = {...prev}
            news[id] = ''
            return news
        })

        if (showTitle[id]) {
            setShowTitle(prevState => {
                const news = {...prevState}
                news[id] = false
                return news
            })
        }


    }

    const handleSubmitTitle = (e) => {
        e.preventDefault()
        const id = e.target.getAttribute('data-id')

        repository.updateTitle({
            id,
            title: titlesState[id]
        }).then(res => {
            if (res.ok) {
                setImages(prev => {
                    const news = [...prev]
                    news.forEach(el => {
                        if (el.id == id) {
                            el.title = res.data.title
                        }
                    })
                    return news
                })
                setShowModify(prev => {
                    const news = {...prev}
                    news[id] = false
                    return news
                })
                setShowTitle(prev => {
                    const news = {...prev}
                    news[id] = false
                    return news
                })
            } else {
                console.log(res.data.errorCode, res.data.errorMessage)
            }
        })
    }

    return {
        toggleShowMain: customToggleShow,
        showImgState,
        handleShowImage,
        handleCloseImage,
        handleTitleState,
        handleModifyTitle,
        images,
        loadingImage,
        titlesState,
        inputLoaded,
        handleSubmitTitle,
        handleDeleteBtn,
        handleDeleteImage,
        showMain,
        showModify,
        showTitle,
        showDelete,
        show,
        toggleShow,
        setInputLoaded
    }
}