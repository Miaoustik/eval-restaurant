import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import Header from "../Components/Header";
import {Container} from "react-bootstrap";
import useControllerRef from "../Hooks/useControllerRef";
import useImages from "../Hooks/useImagesAdmin";
import styled, {keyframes} from "styled-components";
import LoadingFetch from "../Components/Ui/LoadingFetch";
import ImageFullScreen from "../Components/Ui/ImageFullScreen";
import useImagesFullScreen from "../Hooks/useImagesFullScreen";
import AnimateOnHeight from "../Components/Ui/AnimateOnHeight";
import useAnimateOnHeight from "../Hooks/useAnimateOnHeight";

export default function ({isAdmin, user}) {

    const controllerRef = useControllerRef()
    const [newImages, setNewImages] = useState([])
    const [input, setInput] = useState('')
    const fileInputRef = useRef()
    const newImagesInputRef = useRef([])

    const {
        images,
        handleDeleteAll,
        loading: loadingImage
    } = useImages(controllerRef)

    const {
        showImgState,
        handleShowImage,
        handleCloseImage
    } = useImagesFullScreen(images, loadingImage)

    const {state, toggleShow, Refs, layoutEffect} = useAnimateOnHeight()

    const {
        showImgState: showNewImgState,
        handleShowImage: handleShowNewImage,
        handleCloseImage: handleCloseNewImage
    } = useImagesFullScreen(images, loadingImage)

    useLayoutEffect(() => {
        if (!loadingImage) {
            layoutEffect()
        }
    }, [loadingImage])

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
                    let id = null
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



    return (
        <>
            <Header isAdmin={isAdmin} user={user}/>
            <main className={'mainContainer'} >
                <Container fluid={true}>
                    {loadingImage
                        ? (<LoadingFetch message={'Chargement...'} />)
                        : (
                            <>
                                <h2>Gestions des images</h2>
                                <h3>Images actuelles</h3>
                                <ul className={'list-unstyled'}>
                                    {images.map(e => {
                                        return (
                                            <li key={e.id}>
                                                <AnimateOnHeight ref={Refs} toggleShow={toggleShow} state={state} name={e.name} id={e.id}>
                                                    <ButtonOptionsImages1 data-id={e.id} onClick={handleShowImage} show={state[e.id]?.show ? '1' : '0'} className={'btn btn-primary w-100 mt-2'}>Voir</ButtonOptionsImages1>
                                                    <ButtonOptionsImages2 show={state[e.id]?.show ? '1' : '0'} className={'btn btn-primary w-100 mt-2'}>Modifier le titre</ButtonOptionsImages2>
                                                    <ButtonOptionsImages3 show={state[e.id]?.show ? '1' : '0'} className={'btn btn-primary w-100 mt-2 mb-4'}>Supprimer</ButtonOptionsImages3>
                                                </AnimateOnHeight>
                                                <ImageFullScreen image={e} show={showImgState[e.id]} handleCloseImage={handleCloseImage} />
                                            </li>
                                        )
                                    })}
                                </ul>
                                {newImages.length > 0 && <h3>Nouvelles images</h3>}
                                <form onSubmit={handleNewSubmit}>
                                    {newImages.map(e => {
                                        return (
                                            <NewDiv key={e.id} className="mb-3">
                                                <p>{e.file.name}</p>
                                                <button data-id={e.id} className={'btn btn-primary w-100 mb-4'} onClick={handleShowNewImage}>Voir</button>
                                                <label className={'mb-2'} htmlFor={'imageInput' + e.id}>Titre de l'image : </label>
                                                <input ref={ el => newImagesInputRef.current[e.id] = el} id={'imageInput' + e.id} className={'form-control border-primary'} type={'text'} />
                                                <button data-id={e.id} onClick={deleteNew} className={'btn btn-primary w-100 mt-4'}>Annuler</button>
                                                <ImageFullScreen image={e} show={showNewImgState[e.id]} handleCloseImage={handleCloseNewImage} base64={e.base64}/>
                                            </NewDiv>
                                        )
                                    })}

                                    <Input ref={fileInputRef} value={input} onChange={handleInput} type="file" />
                                    <button onClick={handleAddImage} className={'btn btn-primary w-100 mb-4'}>Ajouter une image</button>

                                    <button type={'submit'} className={'btn btn-primary w-100 mb-4'}>Valider</button>
                                </form>
                                <button onClick={handleDeleteAll}>Supprimer toutes les images</button>
                            </>
                        )
                    }
                </Container>
            </main>
        </>
    )
}

const Input = styled.input`
    display: none;
`

const animImage = keyframes`

    from {
        opacity: 0;
    }
    
    to {
        opacity: 1;
    }
`

const animImageReverse = keyframes`

    from {
        opacity: 1;
    }
    
    to {
        opacity: 0;
    }
`

const ImgDiv = styled.div`
    display: ${props => props.showImage === '0' ? 'none' : 'block'};
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    z-index: 1000000;
    background-color: black;
    animation: ${props => props.showImage === '3' ? animImage : ( props.showImage === '0' ? animImageReverse : animImage)} 0.3s ease;

`

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`

const LiDiv = styled.div`
    margin-bottom: 1rem;
    border-radius: 15px;
    border: solid 1px var(--bs-primary)
`

const NewDiv = styled(LiDiv)`
    padding: 1rem;
`

const opacity = keyframes`
    from {
        opacity: 0;
    }
    
    66% {
        opacity: 0;
    }
    
    to {
        opacity: 1;
    }
`

const opacityOff = keyframes`
    from {
        opacity: 1;
    }
    
    66% {
        opacity: 0;
    }
    
    to {
        opacity: 0;
    }
`

const ButtonOptionsImages1 = styled.button`
    animation: ${props => props.show === '0' ? opacityOff : opacity } ${props => props.show === '0' ? '0.8s' : '0.266s' } ease ; ;
`
const ButtonOptionsImages2 = styled.button`
    animation: ${props => props.show === '0' ? opacityOff : opacity } ${props => props.show === '0' ? '0.52s' : '0.52s' } ease ; ;
`

const ButtonOptionsImages3 = styled.button`
    animation: ${props => props.show === '0' ? opacityOff : opacity } ${props => props.show === '0' ? '0.266s' : '0.8s' } ease ; ;
`
