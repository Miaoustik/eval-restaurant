import React from "react";
import ImageFullScreen from "../../Ui/ImageFullScreen";
import styled, {keyframes} from "styled-components";
import HeightTransition from "../../Ui/HeightTransition";

export default function (
    {
        newImages,
        handleNewSubmit,
        handleShowNewImage,
        newImagesInputRef,
        deleteNew,
        showNewImgState,
        fileInputRef,
        handleInput,
        input,
        handleAddImage,
        handleCloseNewImage,
        show,
        setShow,
        toggleShow,
        start
    }
) {
    return (
        <>
           <h3 className={'merri text-primary mb-4 fs-4'}>Nouvelles images</h3>
            <form onSubmit={handleNewSubmit}>
                {newImages.map(e => {
                    return (
                        <HeightTransition key={e.id} show={show[e.id]} start={start}>
                            <NewDiv className="mb-3">
                                <p>{e.file.name}</p>
                                <button data-id={e.id} className={'btn btn-primary w-100 mb-4'} onClick={handleShowNewImage}>Voir</button>
                                <label className={'mb-2'} htmlFor={'imageInput' + e.id}>Titre de l'image : </label>
                                <input ref={ el => newImagesInputRef.current[e.id] = el} id={'imageInput' + e.id} className={'form-control border-primary'} type={'text'} />
                                <button data-id={e.id} onClick={deleteNew} className={'btn btn-primary w-100 mt-4'}>Annuler</button>
                                <ImageFullScreen image={e} show={showNewImgState[e.id]} handleCloseImage={handleCloseNewImage} base64={e.base64}/>
                            </NewDiv>
                        </HeightTransition>
                    )
                })}

                <Input ref={fileInputRef} value={input} onChange={handleInput} type="file" />
                <button onClick={handleAddImage} className={'btn btn-primary w-100 mb-4 shadow1'}>Ajouter une image</button>
                {newImages.length > 0 &&
                    <button type={'submit'} className={'btn btn-primary w-100 mb-4 shadow1'}>Valider</button>
                }
            </form>
        </>
    )
}

const Input = styled.input`
    display: none;
`

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


const ImgDiv = styled.div`
    display: ${props => props.showImage === '0' ? 'none' : 'block'};
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

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`

const LiDiv = styled.div`
    margin-bottom: 1rem;
    border-radius: 15px;
    border: solid 1px var(--bs-primary)
`

const NewDiv = styled(LiDiv)`
    padding: 1rem;
`