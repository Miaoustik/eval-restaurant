import React, {useEffect, useState} from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Carousel, CarouselItem } from "react-bootstrap";
import styled from "styled-components";
import nature from '../../images/nature-sprite.png';
import useScrollToTop from "../Hooks/useScrollToTop";
import useControllerRef from "../Hooks/useControllerRef";
import useImagesHome from "../Hooks/useImagesHome";
import {useNavigate} from "react-router-dom";
import LoadingFetch from "../Components/Ui/LoadingFetch";

export default function ({ horaires, user, isAdmin }) {

    const controllerRef = useControllerRef()
    const [loadingImage, setLoadingImage] = useState(true)
    const [images, loaded] = useImagesHome(controllerRef)
    const navigate = useNavigate()
    const [defaultImages, setDefaultImages] = useState([])

    const [index, setIndex] = useState(0);

    useScrollToTop()

    const handleReserve = (e) => {
        e.preventDefault()
        navigate('/reserver')
    }

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        if (loaded === true) {
            if (images.length === 0) {
                const image1 = new Image()
                image1.src = require('../../images/vegan-1920.jpg')

                const image2 = new Image()
                image2.src = require('../../images/vegan2-1920.jpg')

                setDefaultImages(() => {
                    return [
                        {
                            id: 1,
                            title: "Repas vegan",
                            src: require('../../images/vegan-1920.jpg')
                        },
                        {
                            id: 2,
                            title: "Repas indien",
                            src: require('../../images/vegan2-1920.jpg')
                        }
                    ]
                })
            } else {
                images.forEach(image => {
                    const image1 = new Image()
                    image1.src = '/uploads/images/' + image.name
                })
            }
            setLoadingImage(false)
        }

    }, [images])

    return (
        <>
            <Header light={'1'} isAdmin={isAdmin} user={user}/>
            <Main>
                {loadingImage
                    ? (
                        <LoadingFetch message={'Chargement des images ...'} className={'w-100 h-100'} />
                    )
                    : (
                        <>
                            <CarouselStyled activeIndex={index} onSelect={handleSelect} interval={null}>

                                {images.length === 0 &&
                                    defaultImages.map(e => {
                                        return (
                                            <CarouselItem key={e.id} className={'h-100'}>
                                                <Img
                                                    className={'d-block w-100'}
                                                    src={e.src}
                                                    alt={e.title}
                                                    title={e.title}
                                                />
                                                <Carousel.Caption >
                                                    <h3>{e.title}</h3>
                                                </Carousel.Caption>
                                            </CarouselItem>
                                        )
                                    })
                                }


                                {images.map(e => {
                                    return (
                                        <CarouselItem key={e.id} className={'h-100'}>
                                            <Img
                                                className={'d-block w-100'}
                                                src={'/uploads/images/' + e.name}
                                                alt={e.title}
                                                title={e.title}
                                            />
                                            <Carousel.Caption >
                                                <h3>{e.title}</h3>
                                            </Carousel.Caption>
                                        </CarouselItem>
                                    )
                                })}


                            </CarouselStyled>
                            <div className={'d-flex justify-content-center bg-black py-2'}>
                                <ButtonContainer>
                                    <Mask>Réserver</Mask>
                                    <ReserveBtn onClick={handleReserve} url={nature} className={'text-white'} >Réserver</ReserveBtn>
                                </ButtonContainer>
                            </div>
                        </>
                    )
                }

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