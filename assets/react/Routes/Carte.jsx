import React, {useEffect, useState} from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import styled from "styled-components";
import entree from "../../images/vegan-1920.jpg"
import useControllerRef from "../Hooks/useControllerRef";
import useCarteRepository from "../Hooks/Repository/useCarteRepository";
import LoadingFetch from "../Components/Ui/LoadingFetch";
import HeightTransition from "../Components/Ui/HeightTransition";
import useHeightTransition from "../Hooks/useHeightTransition";

export default function ({horaires, isAdmin, user}) {

    const controllerRef = useControllerRef()
    const {carte, repository} = useCarteRepository(controllerRef)
    const [loading, setLoading] = useState(true)
    const {show, toggleShow} = useHeightTransition()
    const [loadingImage, setLoadingImage] = useState(true)

    useEffect(() => {
        repository.get()
            .then(() => {
                const image = new Image()
                image.src = entree
                setLoadingImage(false)
            })
            .finally(() => setLoading(false))
    }, [])


    return (
        <>
            <Header user={user} isAdmin={isAdmin}/>
            {loadingImage
                ? (<LoadingFetch message={'Chargement ...'} className={'w-100 h-100'} />)
                : (
                    <>
                        {loading
                            ? (
                                <Main className={'mainContainer px-5 d-flex align-items-center'}>
                                    <LoadingFetch className={'text-white'} message={'Chargement de la carte...'} />
                                </Main>
                            )
                            : (
                                <>
                                    <Main className={'mainContainer px-5'}>
                                        <div className={'container-sm'}>
                                            <Div className={'my-5 border border-primary py-2 text-primary bgOrange d-flex justify-content-center shadow1'}>
                                                <H2 className={'vibes d-block mb-0 mx-2 pt-1'}>Carte du Restaurant</H2>
                                            </Div>
                                            <div className={'pb-4'}>
                                                {carte.map(el => {
                                                    return (
                                                        <Div key={el.id} className={'flex-column border border-primary py-2 text-primary bgOrange d-flex align-items-center shadow1 px-3 mt-3'}>
                                                            <div onClick={toggleShow} data-id={el.id} className={'w-100'} role={'button'}>
                                                                <p data-id={el.id} className={'vibes fs-2 text-primary my-3 text-center '}>{el.name}</p>
                                                            </div>
                                                            <HeightTransition className={'w-100'} show={show[el.id]}>
                                                                {el.dishes.map(dish => {
                                                                    return (
                                                                        <DivDish key={dish.id} className={'border border-primary w-100 p-3 mb-3 shadow1'}>
                                                                            <p className={'merri text-black text-center'}>{dish.title}</p>
                                                                            <p className={'mukta text-black text-center'}>{dish.description}</p>
                                                                            <p className={'mukta text-black text-center'}>{dish.price} €</p>
                                                                        </DivDish>
                                                                    )
                                                                })}
                                                            </HeightTransition>
                                                        </Div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                    </Main>
                                </>
                            )
                        }
                    </>
                )
            }


            <Footer horaires={horaires} />
        </>
    )
}

const Main = styled.main`
    min-height: 100%;
    background: center / cover no-repeat url(${entree});
`

const H2 = styled.h2`
    font-size: 2rem;
`

const Div = styled.div`
    border-radius: 1rem;
`

const DivDish = styled(Div)`
    background-color: #CBA58E;
`