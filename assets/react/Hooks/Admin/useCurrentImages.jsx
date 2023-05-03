import {useLayoutEffect, useState} from "react";
import useAnimateOnHeight from "../useAnimateOnHeight";
import useImagesFullScreen from "../useImagesFullScreen";

export default function (images, loadingImage, repository, setImages, setRefreshImg) {
    const [titlesState, setTitlesState] = useState({})
    const {state, toggleShow, Refs, layoutEffect, setState} = useAnimateOnHeight()
    const {state: stateModify, toggleShow: toggleShowModify, Refs: RefsModify, layoutEffect: layoutEffectModify, setState: setStateModify} = useAnimateOnHeight()
    const [inputLoaded, setInputLoaded] = useState(false)
    const {state: stateTitle, Refs: RefsTitle, layoutEffect: layoutEffectTitle, setState: setStateTitle, toggleShow: toggleShowTitle} = useAnimateOnHeight()
    const {
        state: stateDelete,
        setState: setStateDelete,
        toggleShow: toggleShowDelete,
        layoutEffect: layoutEffectDelete,
        Refs: RefsDelete
    } = useAnimateOnHeight()

    const {
        showImgState,
        handleShowImage,
        handleCloseImage
    } = useImagesFullScreen(images, loadingImage)

    useLayoutEffect(() => {
        if (images.length > 0 && !loadingImage) {
            setTitlesState(() => {
                const news = {}
                images.forEach(e => {
                    news[e.id] = ''
                })
                return news
            })
            layoutEffect()
            layoutEffectModify()
            layoutEffectTitle()
            layoutEffectDelete()
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

        setStateTitle(prev => {
            const news = {...prev}
            news[id].show = e.target.value !== '';
            return news
        })
    }

    const customToggleShow = (e) => {
        e.preventDefault()
        toggleShow(e)
        const id = e.target.getAttribute('data-id')

        if (state[id].show === true) {

            setStateTitle(prev => {
                const news = {...prev}
                news[id].show = false
                return news
            })

            setStateModify(prev => {
                const news = {...prev}
                news[id].show = false
                return news
            })

            setStateDelete(prev => {
                const news = {...prev}
                news[id].show = false
                return news
            })

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

        if (stateModify[id].show) {
            setStateTitle(prevState => {
                const news = {...prevState}
                news[id].show = false
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
            } else {
                console.log(res.data.errorCode, res.data.errorMessage)
            }
        })
    }

    return {
        state,
        stateModify,
        toggleShow: customToggleShow,
        toggleShowModify,
        Refs,
        RefsModify,
        showImgState,
        handleShowImage,
        handleCloseImage,
        handleTitleState,
        handleModifyTitle,
        images,
        loadingImage,
        titlesState,
        inputLoaded,
        stateTitle,
        RefsTitle,
        toggleShowTitle,
        handleSubmitTitle,
        stateDelete,
        RefsDelete,
        handleDeleteBtn,
        handleDeleteImage
    }
}