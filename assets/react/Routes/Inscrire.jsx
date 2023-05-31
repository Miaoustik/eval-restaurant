import React, {useEffect, useRef, useState} from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import styled from "styled-components";
import inscriptionImg from '../../images/vegan2-1920.jpg'
import InputWithRef from "../Components/Ui/InputWithRef";
import {useNavigate} from "react-router-dom";
import useControllerRef from "../Hooks/useControllerRef";
import useScrollToTop from "../Hooks/useScrollToTop";
import LoadingFetch from "../Components/Ui/LoadingFetch";

export default function ({horaires, error, user, register, loadingRegister, isAdmin}) {

    const navigate = useNavigate()
    const controllerRef = useControllerRef()
    const scrollToTop = useScrollToTop()

    const emailRef = useRef()
    const passwordRef = useRef()
    const conviveRef = useRef()
    const allergenRef = useRef()

    const [loadingImage, setLoadingImage] = useState(true)

    useEffect(() => {
        const image = new Image()
        image.src = inscriptionImg
        setLoadingImage(false)
    }, [])

    useEffect(() => {
        if (user) {
            navigate('/login')
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()

        scrollToTop(s => !s)

        const inscrireObj = {
            username: emailRef.current.value,
            password: passwordRef.current.value,
            convive: conviveRef.current.value,
            allergen: allergenRef.current.value
        }

        register(inscrireObj, controllerRef)
    }

    return (
        <>
            <Header user={user} isAdmin={isAdmin}/>
            {loadingImage
                ? (<LoadingFetch message={'chargement...'} className={'w-100 h-100'} /> )
                : (
                    <>
                        <Main className={'mainContainer'}>
                            <div className={'container-sm'}>
                                <FormDiv>

                                    {loadingRegister
                                        ? <LoadingFetch message={'Création du compte en cours ...'} />
                                        : (
                                            <>
                                                <h2 className={'text-primary merri fs-5 text-center'}>S'inscrire</h2>

                                                {error !== null && (
                                                    <div className={'alert alert-danger shadow1'}>
                                                        {error}
                                                    </div>
                                                )}
                                                <form onSubmit={handleSubmit}>
                                                    <div className={"mb-3"}>
                                                        <InputWithRef ref={emailRef} required={true} type={'email'} label={'Email :'} placeholder={'Votre email ...'} autofocus={true}/>
                                                    </div>
                                                    <div className={"mb-3"}>
                                                        <InputWithRef ref={passwordRef}  required={true} type={'password'} label={'Mot de passe :'} placeholder={'Votre mot de passe ...'} />
                                                    </div>
                                                    <div className={"mb-3"}>
                                                        <InputWithRef min={0} max={30} ref={conviveRef}  required={true} type={'number'} label={'Nombres de convives par défaut :'}/>
                                                    </div>
                                                    <div className={"mb-3"}>
                                                        <InputWithRef ref={allergenRef} type={'textarea'} rows={5} label={'Si vous avez des allergies :'} placeholder={'Veuillez spécifier vos allergies...'} />
                                                    </div>

                                                    <button type={'submit'} className={'btn btn-primary shadow1 merri w-100 mt-5'}>S'inscrire</button>
                                                </form>
                                            </>
                                        )
                                    }
                                </FormDiv>
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
    background: center / cover no-repeat url(${inscriptionImg});
    min-height: 100%;
    padding-bottom: 2rem;
`
const FormDiv = styled.div`
    border-radius: 15px;
    background-color: #FFFFFF51;
    backdrop-filter: blur(25px);
    padding: 2rem 1rem 2rem 1rem;
    margin: 2rem 0 0 0;
    
`
