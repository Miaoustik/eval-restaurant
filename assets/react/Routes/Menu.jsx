import React, {useEffect, useState} from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import styled from "styled-components";
import black from "../../images/blackboard-1920.jpg"
import useMenuRepository from "../Hooks/Repository/useMenuRepository";
import useControllerRef from "../Hooks/useControllerRef";
import LoadingFetch from "../Components/Ui/LoadingFetch";
import useScrollToTop from "../Hooks/useScrollToTop";

export default function ({horaires, user, isAdmin}) {

    const controllerRef = useControllerRef()
    const {menus, repository, setMenus} = useMenuRepository(controllerRef)
    const [loading, setLoading] = useState(true)
    const scrollToTop = useScrollToTop()
    const [loadingImage, setLoadingImage] = useState(true)

    useEffect(() => {
        scrollToTop(s => !s)
        const image = new Image()
        image.src = black
        setLoadingImage(false)
        repository.get()
            .then(res => {
                if (res.ok) {
                    setMenus(res.data)
                }
            })
            .finally(() => setLoading(false))
    }, [])


    return (
        <>
            <Header user={user} isAdmin={isAdmin} />

            {loadingImage
                ? (<LoadingFetch message={'Chargement ...'} className={'w-100 h-100'} /> )
                : (
                    <>
                        <Main className={'mainContainer '}>

                            <div className={'container-sm d-flex flex-column align-items-center'}>
                                {loading
                                    ? (<LoadingFetch className={'text-white'} message={'Chargement du menu ...  '}  />)
                                    : (
                                        <>
                                            <H2 className={'vibes d-table mb-5 mx-2 pt-1 text-white mt-5 text-decoration-underline'}>Menus</H2>

                                            {menus.map(menu => {
                                                return (
                                                    <React.Fragment key={menu.id}>
                                                        <Title className={'text-white vibes mb-5'}>{menu.title}</Title>
                                                        <div className={'w-100 px-4'} >
                                                            {menu.formulas.map(formula => {
                                                                return (
                                                                    <div className={'w-100 mb-5'} key={formula.id}>
                                                                        <p className={'text-center text-white text-decoration-underline merri'}>{formula.title}</p>
                                                                        <p className={'text-center text-white mukta'}>{formula.description}</p>
                                                                        <p className={'text-center text-white mukta'}>{formula.price} euros.</p>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })}

                                        </>
                                    )
                                }
                            </div>

                        </Main>
                    </>
                )
            }


            <Footer horaires={horaires} />
        </>
    )
}

const Main = styled.main`
    min-height: 100%;
    background: center / cover no-repeat url(${black});
`

const Title = styled.p`
    font-size: 2rem;
`

const H2 = styled.h2`
    font-size: 3rem;
`