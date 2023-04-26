import React, {useState} from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import homepage from '../../images/Homepage-1920.jpg';
import chef from '../../images/chef-1920.jpg';
import vegan from '../../images/vegan-1920.jpg';
import { Carousel, CarouselItem } from "react-bootstrap";
import styled from "styled-components";
import nature from '../../images/nature-sprite.png';
import useScrollToTop from "../Hooks/useScrollToTop";

export default function ({ horaires }) {

    useScrollToTop()
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <Header light={'1'}/>
            <Main>
                <CarouselStyled activeIndex={index} onSelect={handleSelect} interval={null}>
                    <CarouselItem className={'h-100'}>
                        <Img
                            className={'d-block w-100'}
                            src={homepage}
                            alt={'Plat number 1'}
                        />
                        <Carousel.Caption >
                            <h3>Plat number 1</h3>
                        </Carousel.Caption>
                    </CarouselItem>
                    <CarouselItem className={'h-100'}>
                        <Img
                            className={'d-block w-100'}
                            src={chef}
                            alt={'Plat number 2'}
                        />
                        <Carousel.Caption >
                            <h3>Plat number 2</h3>
                        </Carousel.Caption>
                    </CarouselItem>
                    <CarouselItem className={'h-100'}>
                        <Img
                            className={'d-block w-100'}
                            src={vegan}
                            alt={'Plat number 3'}
                        />
                        <Carousel.Caption >
                            <h3>Plat number 3</h3>
                        </Carousel.Caption>
                    </CarouselItem>
                </CarouselStyled>
                <div className={'d-flex justify-content-center bg-black py-2'}>
                    <ButtonContainer>
                        <Mask>Réserver</Mask>
                        <ReserveBtn url={nature} className={'text-white'} >Réserver</ReserveBtn>
                    </ButtonContainer>
                </div>
            </Main>
            <Footer horaires={horaires}/>
        </>
    )
}

const Main = styled.main`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const CarouselStyled = styled(Carousel)`
    height: calc(100% - 3.75rem);
`

const Img = styled.img`
    object-fit: cover;
    height: 100%;
    object-position: center;
`

const Mask = styled.span`
    position: absolute;
    color: #000;
    padding-top: 0.5rem;
    top: 0;
    left: 0;
    background-color: #FFF;
    text-align: center;
    width: 101%;
    display: block;
    height: 100%;
    font-family: 'Merriweather', sans-serif;
    position: absolute;
    overflow: hidden;
    
`

const ReserveBtn = styled.button`
    width: 101%;
    height: 100%;
    color: #FFF;
    padding: .5rem;
    mask: url(${props => props.url});
    background: #000;
    mask-size: 2300% 100%;
    border: none;
    animation: ani2 0.7s steps(22) forwards;
    &:hover {
        animation: ani 0.7s steps(22) forwards;
    }
    @keyframes ani {
     from {
      mask-position: 0% 0;
     }
     to {
      mask-position: 100% 0;
     }
    };
    @keyframes ani2 {
     from {
      mask-position: 100% 0;
     }
     to {
      mask-position: 0% 0;
     }
    };
`

const ButtonContainer = styled.div`
     position: relative;
     overflow: hidden;
     border: solid 2px white;
     font-family: Merriweather, sans-serif;
     transition: 0.5s;
     border-radius: 0.5rem;
`