import React, {useEffect, useRef, useState} from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import styled from "styled-components";
import inscriptionImg from '../../images/inscription-1920.jpg'
import InputWithRef from "../Components/Ui/InputWithRef";
import {useNavigate} from "react-router-dom";
import useControllerRef from "../Hooks/useControllerRef";
import useScrollToTop from "../Hooks/useScrollToTop";
import LoadingFetch from "../Components/Ui/LoadingFetch";

export default function ({horaires, user, login, isAdmin}) {

    const navigate = useNavigate()
    const controllerRef = useControllerRef()
    const scrollToTop = useScrollToTop()

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user) {
            navigate('/login')
        }
    }, [user])

    useEffect(() => {
        return () => {
            controllerRef.current.abort()
        }
    }, [])

    const emailRef = useRef()
    const passwordRef = useRef()
    const conviveRef = useRef()
    const allergenRef = useRef()


    const handleSubmit = async (e) => {
        e.preventDefault()

        const username = emailRef.current.value
        const password = passwordRef.current.value

        const inscrireObj = {
            username: username,
            password: password,
            convive: conviveRef.current.value,
            allergen: allergenRef.current.value
        }

        const fetchPostOptions = {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(inscrireObj),
            signal: controllerRef.current.signal
        }

        setLoading(true)
        scrollToTop(s => !s)

        try {
            const response = await fetch('/api/inscription/inscrire', fetchPostOptions)
            const data = await response.json()

            switch (response.status) {
                case 409 :
                    setError(data.error)
                    break
                case 502 :
                    setError(data.code + ' : ' + data.message)
                    break
                case 201 :
                    setError(null)
                    login(username, password, controllerRef)
                    break
                default:
                    setError(data.code + ' : ' + data.message)
            }

        } catch (e) {
            console.warn(e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Header user={user} isAdmin={isAdmin}/>
            <Main className={'mainContainer container-fluid'}>
                <FormDiv>

                    {loading
                        ? <LoadingFetch message={'Création du compte en cours ...'} />
                        : (
                            <>
                                <h2 className={'text-primary merri fs-5'}>S'inscrire</h2>
                                {error !== null && (
                                    <div className={'alert alert-danger shadow1'}>
                                        {error}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <InputWithRef ref={emailRef} required={true} type={'email'} label={'Email :'} placeholder={'Votre email ...'} autofocus={true}/>
                                    <InputWithRef ref={passwordRef}  required={true} type={'password'} label={'Mot de passe :'} placeholder={'Votre mot de passe ...'} />

                                    <InputWithRef min={0} max={30} ref={conviveRef}  required={true} type={'number'} label={'Nombres de convives par défaut :'}/>
                                    <InputWithRef ref={allergenRef} type={'textarea'} rows={5} label={'Si vous avez des allergies :'} placeholder={'Veuillez spécifier vos allergies...'} />

                                    <button type={'submit'} className={'btn btn-primary shadow1 merri w-100 mt-5'}>S'inscrire</button>
                                </form>
                            </>
                        )
                    }
                </FormDiv>
            </Main>
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
