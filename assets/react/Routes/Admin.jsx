import React, {useEffect, useState} from "react";
import Header from "../Components/Header";
import {Container} from "react-bootstrap";
import useControllerRef from "../Hooks/useControllerRef";
import useImages from "../Hooks/useImagesAdmin";
import styled from "styled-components";

export default function ({isAdmin, user}) {

    const controllerRef = useControllerRef()
    const [clickShowState, setClickShowState] = useState({})

    const {
        images,
        imgRef,
        handleSave,
        handleDeleteAll
    } = useImages(controllerRef)

    const handleShow = (e) => {
        setClickShowState(prevState => {
            const id = e.target.getAttribute('data-id')
            const newState = {...prevState}
            newState[id] = !newState[id]
            return newState
        })
    }

    useEffect(() => {
        if (images.length > 0) {
            setClickShowState(() => {
                const obj = {}
                images.forEach(e => {
                    obj[e.id] = false
                })
                return obj
            })
        }
    }, [images])

    return (
        <>
            <Header isAdmin={isAdmin} user={user}/>
            <main className={'mainContainer'}>
                <Container fluid={true}>
                    <h1>Ici Admin</h1>
                    <button className={'btn btn-primary w-100'}>Gérer les images</button>
                    <div>
                        <h2>Gestions des images</h2>
                        <h3>Images actuelles</h3>
                        <ul className={'list-unstyled'}>
                            {images.map(e => {
                                return <li key={e.id}>
                                    <LiDiv className={'shadow1'}>
                                        <ButtonShow show={clickShowState[e.id] ? '1' : '0'} data-id={e.id} onClick={handleShow}>{e.name}</ButtonShow>
                                        <ClickShow show={clickShowState[e.id] ? '1' : '0'}>
                                            <button className={'btn btn-primary w-100 mt-2'}>Modifier le nom</button>
                                            <button className={'btn btn-primary w-100 mt-2'}>Modifier le titre</button>
                                            <button className={'btn btn-primary w-100 my-2'}>Voir</button>
                                        </ClickShow>
                                        <Img src={"/uploads/images/" + e.name } alt={e.title}/>
                                    </LiDiv>
                                </li>
                            })}
                        </ul>
                        <form onSubmit={handleSave}>
                            <div className="mb-3">
                                <label htmlFor="formFileMultiple" className="form-label">Multiple files input
                                    example
                                </label>
                                <input ref={imgRef} className="form-control" type="file" id="formFileMultiple" multiple/>
                            </div>
                            <button>Submit</button>
                        </form>
                    </div>
                    <button onClick={handleDeleteAll}>Supprimer toutes les images</button>
                    <div className={'w-100'}>
                        {images.map(e => {
                            return (
                                <img className={'w-100'} key={e.name} src={"/uploads/images/" + e.name} alt={e.title} />
                            )
                        })}
                    </div>
                </Container>
            </main>
        </>
    )
}

const Img = styled.img`
    display: none;
    width: 100%;
`

const LiDiv = styled.div`
    margin-bottom: 1rem;
    border-radius: 15px;
    border: solid 1px var(--bs-primary)
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
    max-height: ${props => props.show === '0' ? '0' : 'auto'};
    overflow: hidden;
`