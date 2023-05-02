import React from "react";
import styled, {keyframes} from "styled-components";

export default function ({handleCloseImage, image, show, base64 = null}) {

    return (
        <ImgDiv role={'button'} onClick={handleCloseImage} data-id={image.id}  showImage={show === undefined ? '3' : (show ? '1' : '0')} >
            <Img src={base64 ? base64 : ('/uploads/images/' + image.name)} alt={image.title} data-id={image.id}/>
        </ImgDiv>
    )

}

const animImage = keyframes`

    from {
        opacity: 0;
    }
    
    to {
        opacity: 1;
    }
`

const animImageReverse = keyframes`

    from {
        opacity: 1;
    }
    
    to {
        opacity: 0;
    }
`

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`

const ImgDiv = styled.div`
    display: ${props => props.showImage === '3' ? 'none' : (props.showImage === '0' ? 'none' : 'block')};
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    z-index: 1000000;
    background-color: black;
    animation: ${props => props.showImage === '3' ? animImage : ( props.showImage === '0' ? animImageReverse : animImage)} 0.3s ease;

`