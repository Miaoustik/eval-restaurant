import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import Header from "../Components/Header";
import {Container} from "react-bootstrap";
import useControllerRef from "../Hooks/useControllerRef";
import useImages from "../Hooks/useImagesAdmin";
import styled, {keyframes} from "styled-components";
import LoadingFetch from "../Components/Ui/LoadingFetch";

export default function ({isAdmin, user}) {

    const controllerRef = useControllerRef()
    const [clickShowState, setClickShowState] = useState({})
    const clickShowRef = useRef([])
    const newImageShowRef = useRef([])
    const [newImages, setNewImages] = useState([])
    const [input, setInput] = useState('')
    const fileInputRef = useRef()

    const handleInput = (e) => {
        setInput(e.target.value)
    }

    const {
        images,
        handleDeleteAll,
        loading: loadingImage
    } = useImages(controllerRef)

    const handleShow = (e) => {
        setClickShowState(prevState => {
            const id = e.target.getAttribute('data-id')
            const newState = {...prevState}
            newState[id].show = !newState[id].show
            return newState
        })
    }

    const handleAddImage = (e) => {
        e.preventDefault()
        fileInputRef.current.click()
    }

    useEffect(() => {
        if (input !== '') {

            // !!!!!!!!!!!
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

            console.log(input)
            console.log(fileInputRef.current.files[0])

        }
    }, [input])

    const handleShowImage = (e) => {
        setClickShowState(s => {
            const newState = {...s}
            const id = e.target.getAttribute('data-id')
            newState[id].showImage = true
            document.body.style.overflow = "hidden";
            return newState
        })
    }

    const handleCloseImage = (e) => {
        setClickShowState(s => {
            const newState = {...s}
            const id = e.target.getAttribute('data-id')
            newState[id].showImage = false
            document.body.style.overflow = "auto";
            return newState
        })
    }

    useLayoutEffect(() => {
        if (images.length > 0 && !loadingImage) {
            setClickShowState(() => {
                const newState = {}
                clickShowRef.current.forEach(e => {
                    const id = e.getAttribute('data-id')
                    newState[id] = {
                        height: e.clientHeight,
                        show: false,
                        showImage: false
                    }
                })
                return newState
            })
        }
    }, [images])


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
                                                <LiDiv className={'shadow1'}>
                                                    <ButtonShow show={clickShowState[e.id]?.show === undefined  ? '3' : (clickShowState[e.id]?.show ? '1' : '0')} data-id={e.id} onClick={handleShow}>{e.name}</ButtonShow>
                                                    <ClickShow ref={(el) => clickShowRef.current[e.id] = el} data-id={e.id} height={clickShowState[e.id]?.height} show={clickShowState[e.id]?.show === undefined  ? '3' : (clickShowState[e.id]?.show ? '1' : '0')}>
                                                        <ButtonOptionsImages1 data-id={e.id} onClick={handleShowImage} show={clickShowState[e.id]?.show ? '1' : '0'} className={'btn btn-primary w-100 mt-2'}>Voir</ButtonOptionsImages1>
                                                        <ButtonOptionsImages2 show={clickShowState[e.id]?.show ? '1' : '0'} className={'btn btn-primary w-100 mt-2'}>Modifier le titre</ButtonOptionsImages2>
                                                        <ButtonOptionsImages3 show={clickShowState[e.id]?.show ? '1' : '0'} className={'btn btn-primary w-100 mt-2 mb-4'}>Supprimer</ButtonOptionsImages3>
                                                    </ClickShow>
                                                </LiDiv>
                                                <ImgDiv role={'button'} onClick={handleCloseImage}  showImage={clickShowState[e.id]?.showImage === undefined ? '3' : (clickShowState[e.id].showImage ? '1' : '0')} >
                                                    <Img src={"/uploads/images/" + e.name } alt={e.title} data-id={e.id}/>
                                                </ImgDiv>
                                            </li>)
                                    })}
                                </ul>
                                {newImages.length > 0 && <h3>Nouvelles images</h3>}
                                <form>
                                    {newImages.map(e => {
                                        return (
                                            <NewDiv key={e.id} className="mb-3">
                                                <p>{e.file.name}</p>
                                                <label className={'mb-2'} htmlFor={'imageInput' + e.id}>Titre de l'image : </label>
                                                <input id={'imageInput' + e.id} className={'form-control border-primary'} type={'text'} />
                                                <ImgDiv>
                                                    <Img className={'w-100'} src={e.base64} alt={e.name}/>
                                                </ImgDiv>
                                            </NewDiv>
                                        )
                                    })}

                                    <Input ref={fileInputRef} value={input} onChange={handleInput} type="file" />
                                    <button onClick={handleAddImage} className={'btn btn-primary'}>Ajouter une image</button>
                                    <button type={'submit'} className={'btn btn-primary'}>Valider</button>
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

const ButtonShow = styled.button`
    background-color: transparent;
    border: none;
    width: 100%;
    text-align: start;
    padding: 1rem;
    border: none; 
`

const ClickShow = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    overflow: hidden;
    max-height: ${props => props.show === '3' ? 'auto' : (props.show === '0' ? '0' : (props.height.toString() + 'px'))};
    transition: max-height 0.8s ease;
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
