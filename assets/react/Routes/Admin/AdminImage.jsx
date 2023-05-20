import React, {useEffect} from "react";
import Header from "../../Components/Header";
import {Container} from "react-bootstrap";
import useControllerRef from "../../Hooks/useControllerRef";
import useImages from "../../Hooks/useImagesAdmin";
import LoadingFetch from "../../Components/Ui/LoadingFetch";
import useCurrentImages from "../../Hooks/Admin/useCurrentImages";
import CurrentImages from "../../Components/Admin/Images/CurrentImages";
import useNewImages from "../../Hooks/Admin/useNewImages";
import NewImages from "../../Components/Admin/Images/NewImages";
import HeightTransition from "../../Components/Ui/HeightTransition";
import Footer from "../../Components/Footer";
import useHeightTransition from "../../Hooks/useHeightTransition";
import useScrollToTop from "../../Hooks/useScrollToTop";

export default function ({isAdmin, user, horaires}) {

    const controllerRef = useControllerRef()

    const {
        images,
        handleDeleteAll: handleDeleteAllAbstract,
        loading: loadingImage,
        repository,
        setImages,
        setRefreshImg,
        loadingDelete
    } = useImages(controllerRef)

    const {show, toggleShow, setShow} = useHeightTransition()

    const handleDeleteAll = () => {
        handleDeleteAllAbstract()
        setShow(s => {
            const n = {...s}
            n['1'] = false
            return n
        })
    }

    const propsCurrent = useCurrentImages(images, loadingImage, repository, setImages, setRefreshImg)
    const propsNew = useNewImages(images, loadingImage, repository, propsCurrent.setInputLoaded)

   useScrollToTop()


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

                                <h3 className={'merri text-primary fs-4 mb-4'}>Suppression de la galerie d'image</h3>
                                {loadingDelete
                                    ? (<LoadingFetch message={"Suppression des images en cours"} />)
                                    : (
                                        <>
                                            <button data-id={'1'} className={'btn w-100 shadow1 mb-4 ' + (show['1'] ? 'btn-success' : 'btn-danger')} onClick={toggleShow}>{show['1'] ? 'Annuler' : "Supprimer la galerie d'images"}</button>
                                            <HeightTransition show={show['1']} className={'mb-5'}>
                                                <p className={"px-2 merri"}>Êtes-vous sûr ?</p>
                                                <button className={'btn btn-danger w-100 shadow1'} onClick={handleDeleteAll}>Confirmer</button>
                                            </HeightTransition>
                                        </>
                                    )
                                }
                            </>
                        )
                    }
                </Container>
            </main>
            <Footer horaires={horaires} />
        </>
    )
}










