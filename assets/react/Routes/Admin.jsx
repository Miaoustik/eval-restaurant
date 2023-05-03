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
import InputWithRef from "../Components/Ui/InputWithRef";
import useCurrentImages from "../Hooks/Admin/useCurrentImages";
import CurrentImages from "../Components/Admin/Images/CurrentImages";

export default function ({isAdmin, user}) {

    const controllerRef = useControllerRef()

    const {
        images,
        handleDeleteAll,
        loading: loadingImage,
        repository,
        setImages,
        setRefreshImg
    } = useImages(controllerRef)

    const propsCurrent = useCurrentImages(images, loadingImage, repository, setImages, setRefreshImg)

    return (
        <>
            <Header isAdmin={isAdmin} user={user}/>
            <main className={'mainContainer'} >
                <Container fluid={true}>
                    <h2>Gestions des images</h2>
                    {loadingImage !== false
                        ? (<LoadingFetch message={'Chargement des images...'} />)
                        : (
                            <>
                                <CurrentImages {...propsCurrent} />
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





const LiDiv = styled.div`
    margin-bottom: 1rem;
    border-radius: 15px;
    border: solid 1px var(--bs-primary)
`

const NewDiv = styled(LiDiv)`
    padding: 1rem;
`



