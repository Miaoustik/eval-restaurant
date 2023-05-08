import React from "react";
import HeightTransition from "../../Ui/HeightTransition";
import InputWithRef from "../../Ui/InputWithRef";

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
                                                <form data-id={f.id} onSubmit={props.handleSubmit}>
                                                    <div className={'mx-4 mb-3'}>
                                                        <InputWithRef ref={el => props.inputsRef.current[f.id] = {...props.inputsRef.current[f.id], title: el}} type={'text'} label={"Nouveau titre :"} />
                                                    </div>
                                                    <div className={'mx-4 mb-3'}>
                                                        <InputWithRef ref={el => props.inputsRef.current[f.id] = {...props.inputsRef.current[f.id], description: el}} type={'text'} label={"Nouvelle description :"} />
                                                    </div>
                                                    <div className={'mx-4 mb-3'}>
                                                        <InputWithRef ref={el => props.inputsRef.current[f.id] = {...props.inputsRef.current[f.id], price: el}} type={'text'} label={"Nouveau prix :"} />
                                                    </div>
                                                    <div className={'mx-4 mb-4'}>
                                                        <label className={'mb-2'} htmlFor={'cat' + f.id}>Nouvelle catégorie : </label>
                                                        <select ref={el => props.inputsRef.current[f.id] = { ...props.inputsRef.current[f.id], category: el}} id={'cat' + f.id} className="form-select" >
                                                            <option value={'default'}>Choississez une catégorie</option>
                                                            {props.categories.map(g => {
                                                                return (
                                                                    <option key={g.id} value={g.id}>{g.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <div className={'mx-4 mb-4'}>
                                                        <button type={'submit'} className={'btn btn-primary w-100 shadow1'}>Enregistrer</button>
                                                    </div>
                                                </form>
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