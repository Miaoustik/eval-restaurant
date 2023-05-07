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
import useNewImages from "../Hooks/Admin/useNewImages";
import NewImages from "../Components/Admin/Images/NewImages";
import UseAnimateOnHeight from "../Hooks/useAnimateOnHeight";
import HeightTransition from "../Components/Ui/HeightTransition";
import Footer from "../Components/Footer";
import useHorairesFooter from "../Hooks/useHorairesFooter";
import useHeightTransition from "../Hooks/useHeightTransition";

export default function ({isAdmin, user, horaires}) {

    const controllerRef = useControllerRef()

    const {
        images,
        handleDeleteAll,
        loading: loadingImage,
        repository,
        setImages,
        setRefreshImg
    } = useImages(controllerRef)

    const {show, toggleShow} = useHeightTransition()


    const propsCurrent = useCurrentImages(images, loadingImage, repository, setImages, setRefreshImg)
    const propsNew = useNewImages(images, loadingImage, repository, propsCurrent.setInputLoaded)



    return (
        <>
            <Header isAdmin={isAdmin} user={user}/>
            <main className={'mainContainer'} >
                <Container fluid={true}>
                    <h2 className={'merri mt-4 text-primary '}>Gestions des images</h2>
                    {loadingImage !== false
                        ? (<LoadingFetch message={'Chargement des images...'} />)
                        : (
                            <>
                                <CurrentImages {...propsCurrent} />

                                {propsNew.uploading
                                    ? (<LoadingFetch message={'Upload des images...'} />)
                                    : (<NewImages {...propsNew} />)
                                }

                                <button data-id={'1'} className={'btn w-100 shadow1 mb-4 ' + (show['1'] ? 'btn-success' : 'btn-danger')} onClick={toggleShow}>{show['1'] ? 'Annuler' : 'Supprimer toutes les images'}</button>
                                <HeightTransition show={show['1']} className={'mb-5'}>
                                    <p className={"px-2"}>Êtes-vous sûr ?</p>
                                    <button className={'btn btn-danger w-100 shadow1'} onClick={handleDeleteAll}>Confirmer</button>
                                </HeightTransition>
                            </>
                        )
                    }
                </Container>
            </main>
            <Footer horaires={horaires} />
        </>
    )
}










