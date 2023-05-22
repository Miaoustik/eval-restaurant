import React from "react";
import styled from "styled-components";
import {Container} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

export default function ({ horaires }) {
    const navigate = useNavigate()
    const handleReserve = (e) => {
        e.preventDefault()
        navigate('/reserver')
    }
    return (
        <Footer className={'w-100 text-primary pb-5'}>

                <p className={'d-table mx-auto py-2'}><span>&copy;</span> <span className={'merri'}>Copyright 2023</span></p>
                <Div className={'d-flex w-100'}> {/*mobile flex-column desktop flex-row */}
                    <Half>
                        <p className={'merri text-secondary text-decoration-underline'}>Nos horaires d'ouverture : </p>
                        <ul className={'list-unstyled ps-4'}>
                            {horaires
                                ? (
                                    <>
                                        {horaires.map(e => {
                                            return (
                                                <li key={e.dayName} className={'my-4 d-flex justify-content-start'}>
                                                    <P className={'display-table'}>{e.dayName}</P>
                                                    <div>
                                                        {e.morning === null && e.evening === null &&
                                                            <p className={'text-info'}>Fermé</p>
                                                        }

                                                        {e.morning &&
                                                            <p className={'p-0 m-0'}>{e.morning}</p>
                                                        }
                                                        {e.evening &&
                                                            <p className={'p-0 m-0'}>{e.evening}</p>
                                                        }
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </>
                                )
                                : (<p>Veuillez définir des horaires.</p>)
                            }

                        </ul>
                    </Half>
                    <div>
                        <p className={'merri text-secondary text-decoration-underline'}>Réserver une table: </p>
                        <Button onClick={handleReserve} className={'merri btn btn-outline-primary w-100 text-primary mb-5 shadow1'}>Réserver</Button>
                        <Link to={'/mentions'} className={'merri text-secondary hoverPrimary'}>Mentions Légales</Link>
                    </div>
                </Div>

        </Footer>
    )
}

const Footer = styled.footer`
    background-color: #FEF1E6;
`
const Half = styled.div`
   
`

const Button = styled.button`
    border-width: 2px !important;
    font-family: Merriweather, sans-serif;
    transition: background-color 0.3s ease;
    &:hover {
        color: white !important;
        border-color: white !important;
    }
`

const P = styled.p`
    width: 6rem;
`

const Div = styled.div`
    flex-direction: column;
    padding: 0 1rem 0 1rem;
    
    @media screen and (min-width: 700px) {
        flex-direction: row;
        justify-content: space-evenly;
    }
`