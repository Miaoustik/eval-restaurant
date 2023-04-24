import React, {useState} from "react";
import styled from "styled-components";
import {Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle} from "react-bootstrap";

export default function ({ light = '0' }) {

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(prevState => !prevState);


    return (
        <header>
            <nav>
                <StyledOffCanvas light={light} scroll={true} show={show} onHide={handleShow} className={"d-flex justify-content-center"}>
                    <OffcanvasHeader className={'mx-auto'} >
                        <StyledOffcanvasTitle light={light}>
                            Navigation
                        </StyledOffcanvasTitle>
                    </OffcanvasHeader>
                    <OffcanvasBody>
                        <OffCanvasA href={'#'}>Page d'acceuil</OffCanvasA>
                    </OffcanvasBody>
                </StyledOffCanvas>
                <Button aria-label={'Primary Navigation Button'} className={"plate plate1 fixed-top " + (show ? ' active' : '')}  onClick={handleShow}>
                    <Svg show={show ? '0' : '1'} light={light} version="1.1" height="100" width="100" viewBox="0 0 100 100">
                        <path className="line line1" d="M 30,65 H 70"/>
                        <path className="line line2"
                              d="M 70,50 H 30 C 30,50 18.644068,50.320751 18.644068,36.016949 C 18.644068,21.712696 24.988973,6.5812347 38.79661,11.016949 C 52.604247,15.452663 46.423729,62.711864 46.423729,62.711864 L 50.423729,49.152542 L 50.423729,16.101695"/>
                        <path className="line line3"
                              d="M 30,35 H 70 C 70,35 80.084746,36.737688 80.084746,25.423729 C 80.084746,19.599612 75.882239,9.3123528 64.711864,13.559322 C 53.541489,17.806291 54.423729,62.711864 54.423729,62.711864 L 50.423729,49.152542 V 16.101695"/>
                    </Svg>
                    <Svg show={show ? '0' : '1'} className="x" version="1.1" height="100" width="100" viewBox="0 0 100 100">
                        <path className="line" d="M 34,32 L 66,68"/>
                        <path className="line" d="M 66,32 L 34,68"/>
                    </Svg>
                    <Span>Navigation</Span>
                </Button>
            </nav>
            <Nav light={light} className={'d-flex gap-1 navbar  navbar-expdand-lg border-bottom border-1 pe-2' + (light === '1' ? ' border-white fixed-top' : ' border-primary sticky-top')} >
                <Brand className={'navbar-brand mx-auto ' + (light === '1' ? 'text-white' : 'text-primary')}>Quai Antique</Brand>
                <div>
                    <A light={light} href={'#'} className={'btn fs-6 rounded-4 border border-2 me-2' + (light === '1' ? ' btn-outline-white border-white text-white' : ' btn-outline-primary border-primary text-primary')}>Réserver</A>
                    <A light={light} href={'#'} className={'btn rounded-4 border px-2 py-1 border-2  fs-5' + (light === '1' ? ' btn-outline-white border-white text-white' : ' btn-outline-primary border-primary text-primary')}><i className="bi bi-person-fill"></i><Span>Se connecter</Span></A>
                </div>
            </Nav>
        </header>
    )
}

const Nav = styled.nav`
    background-color: ${props => props.light === '1' ? 'rgba(0, 0, 0, 0.5)' : '#FCDBBC'};
    font-family: Merriweather, sans-serif;
    box-shadow: 0px 4px 4px 0px #00000040;
    z-index: 1025;
`

const Brand = styled.a`
    font-family: Great Vibes, sans-serif;
    font-size: 2rem !important;
    pointer-events: none;
`

const StyledOffCanvas = styled(Offcanvas)`
    background-color: ${props => props.light === '1' ? 'black' : '#FFFFFF'};
`

const StyledOffcanvasTitle = styled(OffcanvasTitle)`
    color: ${props => props.light === '0' ? '' : '#FFFFFF'};
`

const Svg = styled.svg`
    stroke: ${props => props.light === '0' ? '#381B1D' : '#FFFFFF'};
    &:hover {
        stroke: ${props => props.light === '0' ? '#965B31' : (props.show === '0' ? '#F7A458' : '#381B1D')};
    };
    transition: stroke 500ms ease-out;
    position: absolute;
    height: 50px;
    width: 50px;
    z-index: auto;
`

const Button = styled.button`
    height: 50px;
    width: 50px;
    padding: 0;
    margin: 0;
    display: flex;
    background-color: transparent;
    border: none;
    z-index: 10000;
    margin-top: 0.8rem;
`

const Span = styled.span`
    display: none;
`

const OffCanvasA = styled.a`
    color: ${props => props.light === '0' ? '' : '#FFFFFF'};
    text-decoration: none;
    display: table;
    transform: scale(1);
    transform-origin: left;
    transition: transform 0.2s ease-in;
    &:hover {
        color: ${props => props.light === '0' ? '' : '#F7A458'};
        transform: scale(1.1);
    };
`

const A = styled.a`
    transition: color 500ms ease-out;
    transition: background-color 500ms ease-out;
    &:hover {
        color: ${props => props.light === '1' ? '#381B1D' : '#FFFFFF'} !important;
        background-color: ${props => props.light === '1' ? '#FFFFFF' : '#965B31'} !important;
    };
`

