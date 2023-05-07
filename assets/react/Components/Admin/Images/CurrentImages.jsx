import React from "react";
import ImageFullScreen from "../../Ui/ImageFullScreen";
import styled, {keyframes} from "styled-components";
import HeightTransition from "../../Ui/HeightTransition";

export default function (
    {
        toggleShowMain,
        showImgState,
        handleShowImage,
        handleCloseImage,
        handleTitleState,
        handleModifyTitle,
        images,
        titlesState,
        inputLoaded,
        handleSubmitTitle,
        handleDeleteBtn,
        handleDeleteImage,
        showMain,
        showModify,
        showTitle,
        showDelete,
        show,
        toggleShow
    }
) {
    return (
        <>
            <Actual className={'alert alert-info  my-4 fs-6 align-items-center justify-content-between d-flex'} role={'button'} onClick={toggleShow} data-id={'1'}>
                <h3 className={'merri fs-6 m-0'} data-id={'1'} >Images actuelles</h3>
                {show['1'] === true
                    ? <i className="bi bi-caret-up-fill"></i>
                    : <i className="bi bi-caret-down-fill"></i>
                }
            </Actual>
            <HeightTransition show={show['1']}>
                <ul className={'list-unstyled'}>
                    {images.map(e => {
                        return (
                            <li key={e.id}>
                                <ContainerDiv className={'shadow1'}>
                                    <ButtonImg className={'p-3 w-100 text-start'} data-id={e.id} onClick={toggleShowMain}>
                                        <p data-id={e.id}>
                                            {e.name}
                                        </p>
                                        <p data-id={e.id} > Titre : {e.title}</p>
                                    </ButtonImg>
                                    <HeightTransition show={showMain[e.id]}>
                                        <div className={'mx-2'}>
                                            <ButtonOptionsImages1 data-id={e.id} onClick={handleShowImage} show={showMain[e.id] ? '1' : '0'} className={'btn btn-primary w-100 mt-2 shadow1'}>Voir</ButtonOptionsImages1>
                                            <HeightTransition show={showModify[e.id]}>
                                                <div className={'pt-2 mb-2 mx-2 '}>
                                                    <label className={'mb-2'}  htmlFor={'title' + e.id} >Nouveau titre : </label>
                                                    {inputLoaded && <input value={titlesState[e.id]} onChange={handleTitleState} type={'text'} className={'form-control border-primary shadow1'} data-id={e.id} id={'title' + e.id} />}
                                                </div>
                                            </HeightTransition>
                                            <HeightTransition show={showTitle[e.id]}>
                                                <button data-id={e.id} onClick={handleSubmitTitle} className={'btn btn-primary w-100 shadow1 my-2'}>Enregistrer</button>
                                            </HeightTransition>

                                            <ButtonOptionsImages2 onClick={handleModifyTitle} data-id={e.id} show={showMain[e.id] ? '1' : '0'} className={'btn btn-primary w-100 mt-2 shadow1'}>{showModify[e.id] ?  "Annuler" : "Modifier le titre"}  </ButtonOptionsImages2>
                                            <ButtonOptionsImages3 data-id={e.id} onClick={handleDeleteBtn} show={showMain[e.id] ? '1' : '0'} className={'btn w-100 mt-2 mb-4 shadow1 ' + (showDelete[e.id] ? "btn-success" : 'btn-danger')}>{showDelete[e.id] ? "Annuler" : 'Supprimer'}</ButtonOptionsImages3>
                                            <HeightTransition show={showDelete[e.id]}>
                                                <p className={"px-2"}>Êtes-vous sûr ?</p>
                                                <button data-id={e.id} onClick={handleDeleteImage} className={'shadow1 btn btn-danger w-100 mb-2'}>Confirmer</button>
                                            </HeightTransition>
                                        </div>
                                    </HeightTransition>
                                </ContainerDiv>
                                <ImageFullScreen image={e} show={showImgState[e.id]} handleCloseImage={handleCloseImage} />
                            </li>
                        )
                    })}
                </ul>
            </HeightTransition>
        </>
    )

}

const Actual = styled.div`
    
`

const ButtonImg = styled.button`
    background: transparent;
    border: none;
`

const ContainerDiv = styled.div`
    margin-bottom: 1rem;
    border-radius: 15px;
    border: solid 1px var(--bs-primary)
`

const opacity = keyframes`
    from {
        opacity: 0;
    }
    
    66% {
        opacity: 0;
    }
    
    to {
        opacity: 1;
    }
`

const opacityOff = keyframes`
    from {
        opacity: 1;
    }
    
    66% {
        opacity: 0;
    }
    
    to {
        opacity: 0;
    }
`

const ButtonOptionsImages1 = styled.button`
    animation: ${props => props.show === '0' ? opacityOff : opacity } ${props => props.show === '0' ? '0.8s' : '0.266s' } ease ; ;
`
const ButtonOptionsImages2 = styled.button`
    animation: ${props => props.show === '0' ? opacityOff : opacity } ${props => props.show === '0' ? '0.52s' : '0.52s' } ease ; ;
`

const ButtonOptionsImages3 = styled.button`
    animation: ${props => props.show === '0' ? opacityOff : opacity } ${props => props.show === '0' ? '0.5s' : '0.8s' } ease ; ;
`
