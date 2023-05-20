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

    useEffect(() => {
        scrollToTop(s => !s)
        repository.get()
            .then(res => {
                if (res.ok) {
                    console.log(res.data)
                    setMenus(res.data)
                }
            })
            .finally(() => setLoading(false))
    }, [])


    return (
        <>
            <Header user={user} isAdmin={isAdmin} />
            <Main className={'mainContainer d-flex flex-column align-items-center'}>
                {loading
                    ? (<LoadingFetch className={'text-white'} message={'Chargement du menu ...  '}  />)
                    : (
                        <>
                            <H2 className={'vibes d-table mb-5 mx-2 pt-1 text-white mt-5'}>Menus</H2>

                            {menus.map(menu => {
                                return (
                                    <React.Fragment key={menu.id}>
                                        <Title className={'text-white vibes'}>{menu.title}</Title>
                                        <div className={'w-100 px-4'} >
                                            {menu.formulas.map(formula => {
                                                return (
                                                    <div className={'w-100 mb-4'} key={formula.id}>
                                                        <p className={'text-white fs-3 text-decoration-underline merri'}>{formula.title}</p>
                                                        <p className={'text-white fs-5 mukta'}>{formula.description}</p>
                                                        <p className={'text-white fs-5 mukta'}>{formula.price} euros.</p>
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

            </Main>
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