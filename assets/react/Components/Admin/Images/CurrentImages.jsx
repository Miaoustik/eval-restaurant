import React from "react";
import AnimateOnHeight from "../../Ui/AnimateOnHeight";
import ImageFullScreen from "../../Ui/ImageFullScreen";
import styled, {keyframes} from "styled-components";

export default function (
    {
         inputLoaded,
         images,
         Refs,
         toggleShow,
         handleShowImage,
         RefsModify,
         stateModify,
         state,
         titlesState,
         handleTitleState,
         handleModifyTitle,
         showImgState,
         handleCloseImage,
         stateTitle,
         RefsTitle,
         toggleShowTitle,
         handleSubmitTitle,
         stateDelete,
         RefsDelete,
         handleDeleteBtn,
        handleDeleteImage
    }
) {
    return (
        <>
            <h3>Images actuelles</h3>
            <ul className={'list-unstyled'}>
                {images.map(e => {
                    return (
                        <li key={e.id}>
                            <ContainerDiv className={'shadow1'}>
                                <ButtonImg className={'p-3 w-100 text-start'} data-id={e.id} onClick={toggleShow}>
                                    <p data-id={e.id}>
                                        {e.name}
                                    </p>
                                    <p data-id={e.id} > Titre : {e.title}</p>
                                </ButtonImg>
                                <AnimateOnHeight ref={Refs} toggleShow={toggleShow} state={state} id={e.id} >
                                    <div className={'mx-2'}>
                                        <ButtonOptionsImages1 data-id={e.id} onClick={handleShowImage} show={state[e.id]?.show ? '1' : '0'} className={'btn btn-primary w-100 mt-2 shadow1'}>Voir</ButtonOptionsImages1>
                                        <AnimateOnHeight ref={RefsModify} state={stateModify} id={e.id}>
                                            <div className={'pt-2 mb-2 mx-2 pb-5'}>
                                                <label className={'mb-2'}  htmlFor={'title' + e.id} >Nouveau titre : </label>
                                                {inputLoaded && <input value={titlesState[e.id]} onChange={handleTitleState} type={'text'} className={'form-control border-primary shadow1'} data-id={e.id} id={'title' + e.id} />}
                                            </div>
                                        </AnimateOnHeight>
                                        <AnimateOnHeight ref={RefsTitle} state={stateTitle} id={e.id}>
                                            <button data-id={e.id} onClick={handleSubmitTitle} className={'btn btn-primary w-100 shadow1 my-2'}>Enregistrer</button>
                                        </AnimateOnHeight>

                                        <ButtonOptionsImages2 onClick={handleModifyTitle} data-id={e.id} show={state[e.id]?.show ? '1' : '0'} className={'btn btn-primary w-100 mt-2 shadow1'}>{stateModify[e.id]?.show ?  "Annuler" : "Modifier le titre"}  </ButtonOptionsImages2>
                                        <ButtonOptionsImages3 data-id={e.id} onClick={handleDeleteBtn} show={state[e.id]?.show ? '1' : '0'} className={'btn w-100 mt-2 mb-4 shadow1 ' + (stateDelete[e.id]?.show ? "btn-success" : 'btn-danger')}>{stateDelete[e.id]?.show ? "Annuler" : 'Supprimer'}</ButtonOptionsImages3>
                                        <AnimateOnHeight ref={RefsDelete} state={stateDelete} id={e.id}>
                                            <p className={"px-2"}>Êtes-vous sûr ?</p>
                                            <button data-id={e.id} onClick={handleDeleteImage} className={'shadow1 btn btn-danger w-100 mb-2'}>Oui</button>
                                            <button data-id={e.id} onClick={handleDeleteBtn} className={'shadow1 btn btn-success w-100 mb-2'}>Non</button>
                                        </AnimateOnHeight>
                                    </div>
                                </AnimateOnHeight>
                            </ContainerDiv>
                            <ImageFullScreen image={e} show={showImgState[e.id]} handleCloseImage={handleCloseImage} />
                        </li>
                    )
                })}
            </ul>
        </>
        )

}

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
