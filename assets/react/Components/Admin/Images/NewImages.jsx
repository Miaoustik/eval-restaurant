import React from "react";
import ImageFullScreen from "../../Ui/ImageFullScreen";
import styled from "styled-components";

export default function ({newImages, handleNewSubmit, newImagesInputRef}) {
    return (
        <>
            {newImages.length > 0 && <h3>Nouvelles images</h3>}
            <form onSubmit={handleNewSubmit}>
                {newImages.map(e => {
                    return (
                        <NewDiv key={e.id} className="mb-3">
                            <p>{e.file.name}</p>
                            <button data-id={e.id} className={'btn btn-primary w-100 mb-4'} onClick={handleShowNewImage}>Voir</button>
                            <label className={'mb-2'} htmlFor={'imageInput' + e.id}>Titre de l'image : </label>
                            <input ref={ el => newImagesInputRef.current[e.id] = el} id={'imageInput' + e.id} className={'form-control border-primary'} type={'text'} />
                            <button data-id={e.id} onClick={deleteNew} className={'btn btn-primary w-100 mt-4'}>Annuler</button>
                            <ImageFullScreen image={e} show={showNewImgState[e.id]} handleCloseImage={handleCloseNewImage} base64={e.base64}/>
                        </NewDiv>
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