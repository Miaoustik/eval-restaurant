import React, {useEffect, useRef} from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import styled from "styled-components";
import useScrollToTop from "../Hooks/useScrollToTop";
import chef from '../../images/chef-1920.jpg'
import {Container} from "react-bootstrap";
import InputWithRef from "../Components/Ui/InputWithRef";
import useControllerRef from "../Hooks/useControllerRef";
import {Link} from "react-router-dom";
import LoadingFetch from "../Components/Ui/LoadingFetch";

export default function ({ horaires, login, user, logout, error, loadingLogin, loadingLogout}) {


    //TODO loading on login fetch

    const controllerRef = useControllerRef()
    const setRefresh = useScrollToTop()

    useEffect(() => {
        if (error || user) {
            setRefresh(prevState => !prevState)
        }
    }, [error, user])

    const emailRef = useRef();
    const passwordRef = useRef()

    const handleLogin = (e) => {
        e.preventDefault()
        login(emailRef.current.value, passwordRef.current.value, controllerRef)
        setRefresh(prev => !prev)
    }

    const handleLogout = (e) => {
        e.preventDefault()
        logout(controllerRef)
        setRefresh(prev => !prev)
    }

    return (
        <>
            <Header />
            <Main className={'mainContainer d-flex align-items-center min-h-100'}>
                <Container>
                    <FormDiv>
                        {user !== null
                            ? (
                                <>
                                    {loadingLogout
                                        ? (<LoadingFetch message={"Déconnection en cours ..."} /> )
                                        : (
                                            <>
                                                <p>Bonjour {user} </p>
                                                <button onClick={handleLogout} className={'btn btn-outline-primary merri w-100 mt-2'}>Se déconnecter</button>
                                            </>
                                        )
                                    }
                                </>

                            )
                            : (
                                <>
                                    {loadingLogin
                                        ? (
                                            <LoadingFetch message={"Connection en cours ..."} />
                                        )
                                        : (
                                            <>
                                                {error !== null && (
                                                    <div className={'alert alert-danger shadow1'}>
                                                        {error}
                                                    </div>
                                                )}
                                                <h2 className={'merri text-primary fs-5'}>Se connecter</h2>
                                                <p className={'mukta'}>Pas encore de compte ? <Link to={'/inscription'} >S'inscrire</Link> </p>
                                                <form onSubmit={handleLogin}>
                                                    <InputWithRef ref={emailRef} required={true} type={'email'} label={'Email :'} placeholder={'Votre email ...'} autofocus={true}/>
                                                    <InputWithRef ref={passwordRef} required={true} type={'password'} label={'Mot de passe :'} placeholder={'Votre mot de passe ...'} />
                                                    <button type={'submit'} className={'btn btn-primary shadow1 merri w-100 mt-5'}>Se connecter</button>
                                                </form>
                                            </>
                                        )
                                    }

                                </>
                            )
                        }

                    </FormDiv>
                </Container>
            </Main>
            <Footer horaires={horaires} />
        </>
    )
}

const Main = styled.main`
    background: center / cover no-repeat url(${chef});
    min-height: 100%;
`

const FormDiv = styled.div`
    border-radius: 15px;
    background-color: #FFFFFF51;
    backdrop-filter: blur(25px);
    padding: 2rem 1rem 2rem 1rem;
    margin: 2rem 0 2rem 0;
    
`