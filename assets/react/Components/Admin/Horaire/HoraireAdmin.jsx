import React from "react";

export default function (props) {
    return (
        <>
            <h2 className={'merri text-primary my-4 fs-5'}>Modifier les horaires du restaurant</h2>
            {props.loaded &&
                <form onSubmit={props.handleSubmit}>
                    <button type={'submit'} className={'btn btn-primary w-100 shadow1 mb-2'}>Enregistrer</button>
                    {props.horaires.map(el => {
                        return (
                            <div aria-describedby={el.dayName + 'morning'} className={'border border-primary rounded shadow1 px-2 mb-4 py-4'} key={el.dayName}>
                                <p className={'merri text-primary text-decoration-underline'}>{el.dayName}</p>

                                <p className={'merri text-primary mt-4'}>Midi</p>
                                <div className={'input-group shadow1 rounded ' + (props.formError[el.dayName]?.morning && 'is-invalid')}>
                                    <input onBlur={props.handleBlur} required={true} disabled={props.newHoraire[el.dayName].morningClosed} value={props.newHoraire[el.dayName].morningClosed ? '' : props.newHoraire[el.dayName].morningStart} onChange={props.handleChange} data-day={el.dayName} name={'morningStart'} className={'form-control'} type={'time'} />
                                    <span className={'input-group-text'}>à</span>
                                    <input onBlur={props.handleBlur} required={true} disabled={props.newHoraire[el.dayName].morningClosed} value={props.newHoraire[el.dayName].morningClosed ? '' : props.newHoraire[el.dayName].morningEnd} onChange={props.handleChange} data-day={el.dayName} name={'morningEnd'} className={'form-control'} type={'time'} />
                                    <span className={'input-group-text'}>
                                        <input checked={props.newHoraire[el.dayName].morningClosed} onChange={props.handleCheck} data-day={el.dayName} name={'morningClosed'} className={'form-check-input me-2'} type={'checkbox'} />
                                        Fermé
                                    </span>
                                </div>

                                {props.formError[el.dayName]?.morning && (
                                    <div className={'invalid-feedback'}>
                                        {props.formError[el.dayName].morning}
                                    </div>
                                )}

                                <p className={'merri text-primary mt-4'}>Soir</p>
                                <div className={'input-group shadow1 rounded ' + (props.formError[el.dayName]?.evening && 'is-invalid')}>
                                    <input onBlur={props.handleBlur} disabled={props.newHoraire[el.dayName].eveningClosed} value={props.newHoraire[el.dayName].eveningClosed ? '' : props.newHoraire[el.dayName].eveningStart} onChange={props.handleChange} data-day={el.dayName} name={'eveningStart'} className={'form-control'} type={'time'} />
                                    <span className={'input-group-text'}>à</span>
                                    <input onBlur={props.handleBlur} disabled={props.newHoraire[el.dayName].eveningClosed} value={props.newHoraire[el.dayName].eveningClosed ? '' : props.newHoraire[el.dayName].eveningEnd} onChange={props.handleChange} data-day={el.dayName} name={'eveningEnd'} className={'form-control'} type={'time'} />
                                    <span className={'input-group-text'}>
                                        <input checked={props.newHoraire[el.dayName].eveningClosed} onChange={props.handleCheck} data-day={el.dayName} name={'eveningClosed'} className={'form-check-input me-2'} type={'checkbox'} />
                                        Fermé
                                    </span>
                                </div>
                                {props.formError[el.dayName]?.evening && (
                                    <div className={'invalid-feedback'}>
                                        {props.formError[el.dayName].morning}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                    <button type={'submit'} className={'btn btn-primary w-100 shadow1 mb-4'}>Enregistrer</button>
                </form>
            }
        </>
    )
}