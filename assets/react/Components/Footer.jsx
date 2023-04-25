import React from "react";
import styled from "styled-components";
import {Container} from "react-bootstrap";

export default function ({ horaires }) {

    return (
        <Footer className={'w-100 text-primary pb-5'}>
            <Container>
                <p className={'d-table mx-auto py-2'}><span>&copy;</span> <span className={'merri'}>Copyright 2023</span></p>
                <div className={'d-flex flex-column w-100'}> {/*mobile flex-column desktop flex-row */}
                    <Half>
                        <p className={'merri text-secondary text-decoration-underline'}>Nos horaires d'ouverture : </p>
                        <ul className={'list-unstyled ps-4'}>
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
                        </ul>
                    </Half>
                    <div>
                        <p className={'merri text-secondary text-decoration-underline'}>Réserver une table: </p>
                        <Button className={'merri btn btn-outline-primary w-100 text-primary mb-5'}>Réserver</Button>
                        <a href={'#'} className={'merri text-secondary hoverPrimary'}>Mentions Légales</a>
                    </div>
                </div>
            </Container>
        </Footer>
    )
}

const Footer = styled.footer`
    background-color: #FEF1E6;
`
const Half = styled.div`
    width: 100%;
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