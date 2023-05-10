import React from "react";
import HeightTransition from "../../Ui/HeightTransition";
import InputWithRef from "../../Ui/InputWithRef";
import DishForm from "../../Ui/DishForm";

export default function (props) {
    return (
        <>
            <h2 className={'merri text-primary my-4'}>Gestion de la carte</h2>
            {props.carte.map(e => {
                return (
                    <React.Fragment key={e.id}>
                        <div onClick={props.toggleShowCategory} className={'alert alert-info d-flex align-items-center justify-content-between'} role={'button'} data-id={e.id}>
                            <p className={'m-0'} data-id={e.id} >{e.name}</p>
                            {props.showCategory[e.id] === true
                                ? <i className="bi bi-caret-up-fill"></i>
                                : <i className="bi bi-caret-down-fill"></i>
                            }
                        </div>
                        <HeightTransition className={'mb-2'} show={props.showCategory[e.id]}>
                            <div className={'px-2'}>
                                {e.dishes.map(f => {
                                    return (
                                        <div className={'border border-primary shadow1 rounded mb-3'} key={f.id}>
                                            <div className={'m-4 mb-0'}>
                                                <p><span className={'text-secondary'}>Titre : </span>{f.title}</p>
                                                <p><span className={'text-secondary'}>Desciption : </span>{f.description}</p>
                                                <p><span className={'text-secondary'}>Prix : </span>{f.price} euros</p>
                                                <button data-id={f.id} onClick={props.toggleShowModify} className={'btn btn-primary w-100 shadow1 mt-2 mb-4'}>{props.showModify[f.id] ? 'Annuler' : 'Modifier'}</button>
                                            </div>
                                            <HeightTransition show={props.showModify[f.id]} >
                                                <DishForm id={f.id} inputsRef={props.inputsRef} categories={props.categories} handleSubmit={props.handleSubmit} />
                                                <div className={'mx-4'}>
                                                    <button data-id={f.id} className={' btn mb-4 w-100 shadow1 ' + (props.showDelete[f.id] ? 'btn-success' : 'btn-danger')} onClick={props.toggleShowDelete}>{props.showDelete[f.id] ? 'Annuler' : "Supprimer le plat"}</button>
                                                    <HeightTransition className={'pb-4'} show={props.showDelete[f.id]}>
                                                        <p className={'merri'}>Êtes-vous sûr ?</p>
                                                        <button data-id={f.id} onClick={props.handleDelete} className={'btn btn-danger w-100 shadow1'}>Supprimer</button>
                                                    </HeightTransition>
                                                </div>
                                            </HeightTransition>
                                        </div>
                                    )
                                })}
                            </div>
                        </HeightTransition>
                    </React.Fragment>
                )
            })}
        </>
    )
}