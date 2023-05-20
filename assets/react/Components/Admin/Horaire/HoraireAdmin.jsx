import React from "react";

const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

export default function (props) {
    return (
        <>
            <h2 className={'merri text-primary my-4 fs-5'}>Modifier les horaires du restaurant</h2>
            {props.loaded &&
                <form onSubmit={props.handleSubmit}>
                    <button type={'submit'} className={'btn btn-primary w-100 shadow1 mb-2'}>Enregistrer</button>
                    {props.submitError &&
                        <div className={'alert alert-danger'}>
                            Il existe des erreurs dans le formulaire.
                        </div>
                    }

                    {props.submittedOk &&
                        <div className={'alert alert-success'}>
                            Les horaires ont bien été modifiées.
                        </div>
                    }

                    {(props.horaires ?? days).map(el => {
                        return (
                            <div aria-describedby={el?.dayName ?? el  + 'morning'} className={'border border-primary rounded shadow1 px-2 mb-4 py-4'} key={el?.dayName ?? el}>
                                <p className={'merri text-primary text-decoration-underline'}>{el?.dayName ?? el}</p>

                                <p className={'merri text-primary mt-4'}>Midi</p>
                                <div className={'input-group shadow1 rounded ' + (props.formError[el?.dayName ?? el]?.morning && 'is-invalid')}>
                                    <input onBlur={props.handleBlur} required={true} disabled={props.newHoraire[el?.dayName ?? el].morningClosed} value={props.newHoraire[el?.dayName ?? el].morningClosed ? '' : props.newHoraire[el?.dayName ?? el].morningStart ?? ''} onChange={props.handleChange} data-day={el?.dayName ?? el} name={'morningStart'} className={'form-control'} type={'time'} />
                                    <span className={'input-group-text'}>à</span>
                                    <input onBlur={props.handleBlur} required={true} disabled={props.newHoraire[el?.dayName ?? el].morningClosed} value={props.newHoraire[el?.dayName ?? el].morningClosed ? '' : props.newHoraire[el?.dayName ?? el].morningEnd  ?? ''} onChange={props.handleChange} data-day={el?.dayName ?? el} name={'morningEnd'} className={'form-control'} type={'time'} />
                                    <span className={'input-group-text'}>
                                        <input checked={props.newHoraire[el?.dayName ?? el].morningClosed} onChange={props.handleCheck} data-day={el?.dayName ?? el} name={'morningClosed'} className={'form-check-input me-2'} type={'checkbox'} />
                                        Fermé
                                    </span>
                                </div>

                                {props.formError[el?.dayName ?? el]?.morning && (
                                    <div className={'invalid-feedback'}>
                                        {props.formError[el?.dayName ?? el].morning}
                                    </div>
                                )}

                                <p className={'merri text-primary mt-4'}>Soir</p>
                                <div className={'input-group shadow1 rounded ' + (props.formError[el?.dayName ?? el]?.evening && 'is-invalid')}>
                                    <input onBlur={props.handleBlur} disabled={props.newHoraire[el?.dayName ?? el].eveningClosed} value={props.newHoraire[el?.dayName ?? el].eveningClosed ? '' : props.newHoraire[el?.dayName ?? el].eveningStart ?? ''} onChange={props.handleChange} data-day={el?.dayName ?? el} name={'eveningStart'} className={'form-control'} type={'time'} />
                                    <span className={'input-group-text'}>à</span>
                                    <input onBlur={props.handleBlur} disabled={props.newHoraire[el?.dayName ?? el].eveningClosed} value={props.newHoraire[el?.dayName ?? el].eveningClosed ? '' : props.newHoraire[el?.dayName ?? el].eveningEnd ?? ''} onChange={props.handleChange} data-day={el?.dayName ?? el} name={'eveningEnd'} className={'form-control'} type={'time'} />
                                    <span className={'input-group-text'}>
                                        <input checked={props.newHoraire[el?.dayName ?? el].eveningClosed} onChange={props.handleCheck} data-day={el?.dayName ?? el} name={'eveningClosed'} className={'form-check-input me-2'} type={'checkbox'} />
                                        Fermé
                                    </span>
                                </div>
                                {props.formError[el?.dayName ?? el]?.evening && (
                                    <div className={'invalid-feedback'}>
                                        {props.formError[el?.dayName ?? el].evening}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                    {props.submitError &&
                        <div className={'alert alert-danger'}>
                            Il existe des erreurs dans le formulaire.
                        </div>
                    }

                    {props.submittedOk &&
                        <div className={'alert alert-success'}>
                            Les horaires ont bien été modifiées.
                        </div>
                    }

                    <button type={'submit'} className={'btn btn-primary w-100 shadow1 mb-4'}>Enregistrer</button>
                </form>
            }
        </>
    )
}