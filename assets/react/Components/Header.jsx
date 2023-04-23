import React, {useState} from "react";
import styled from "styled-components";
import {Button, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";

export default function () {

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(prevState => !prevState);


    return (
        <header>
            <Nav className={'d-flex gap-1 navbar  navbar-expdand-lg border-bottom border-primary border-1 pe-2'} >
                <div className={"plate plate1 " + (show ? ' active' : '')}  onClick={handleShow}>
                    <svg className="burger" version="1.1" height="100" width="100" viewBox="0 0 100 100">
                        <path className="line line1" d="M 30,65 H 70"/>
                        <path className="line line2"
                              d="M 70,50 H 30 C 30,50 18.644068,50.320751 18.644068,36.016949 C 18.644068,21.712696 24.988973,6.5812347 38.79661,11.016949 C 52.604247,15.452663 46.423729,62.711864 46.423729,62.711864 L 50.423729,49.152542 L 50.423729,16.101695"/>
                        <path className="line line3"
                              d="M 30,35 H 70 C 70,35 80.084746,36.737688 80.084746,25.423729 C 80.084746,19.599612 75.882239,9.3123528 64.711864,13.559322 C 53.541489,17.806291 54.423729,62.711864 54.423729,62.711864 L 50.423729,49.152542 V 16.101695"/>
                    </svg>
                    <svg className="x" version="1.1" height="100" width="100" viewBox="0 0 100 100">
                        <path className="line" d="M 34,32 L 66,68"/>
                        <path className="line" d="M 66,32 L 34,68"/>
                    </svg>
                </div>
                <Brand className={'navbar-brand'}>Quai Antique</Brand>
                <div>
                    <a href={'#'} className={'btn fs-6 btn-outline-primary rounded-4 border border-2 border-primary  me-2'}>Réserver</a>
                    <a href={'#'} className={'btn btn-outline-primary rounded-4 border px-2 py-1 border-2 border-primary fs-5'}><i className="bi bi-person-fill"></i></a>
                </div>
                <Offcanvas show={show} onHide={handleShow} className={"d-flex justify-content-center"}>
                    <OffcanvasHeader className={'mx-auto'} >
                        <OffcanvasTitle>
                            Navigation
                        </OffcanvasTitle>
                    </OffcanvasHeader>
                    <OffcanvasBody>
                        <p>Ici navigation</p>
                        <a className={'text-primary hoverSecondary'} href={'#'}>Page d'acceuil</a>
                    </OffcanvasBody>
                </Offcanvas>
            </Nav>
        </header>
    )
}

const Nav = styled.nav`
    background-color: #F7A45840;
    font-family: Merriweather, sans-serif;
    box-shadow: 0px 4px 4px 0px #00000040;
`

const Brand = styled.a`
    font-family: Great Vibes, sans-serif;
    font-size: 2rem !important;
`