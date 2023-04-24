import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import img from '../../images/Homepage-1920.jpg';
import { Carousel, CarouselItem } from "react-bootstrap";
import styled from "styled-components";

export default function () {
    return (
        <>
            <Header light={'1'}/>
            <main>
                <Carousel>
                    <CarouselItem className={'min-vh-100'}>
                        <Img
                            className={'d-block vw-100 vh-100'}
                            src={img}
                            alt={'Plat number 1'}
                        />
                        <Carousel.Caption >
                            <h3>Plat number 1</h3>
                        </Carousel.Caption>
                    </CarouselItem>
                </Carousel>
            </main>
            <Footer />
        </>
    )
}

const Img = styled.img`
    object-fit: cover;
`