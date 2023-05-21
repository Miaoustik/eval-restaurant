import React, {useEffect, useState, useRef} from "react";
import Header from "../../Components/Header";
import {Container} from "react-bootstrap";
import Footer from "../../Components/Footer";
import useControllerRef from "../../Hooks/useControllerRef";
import httpApi from "../../Components/Utils/httpApi";
import LoadingFetch from "../../Components/Ui/LoadingFetch";


export default function ({horaires, user, isAdmin}) {

    const controllerRef = useControllerRef()
    const http = httpApi(controllerRef)
    const [input, setInput] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [loadingRotation, setLoadingRotation] = useState(false)
    const [maxMorning, setMaxMorning] = useState(0)
    const [maxEvening, setMaxEvening] = useState(0)
    const maxRef = useRef()

    const handleInput = (e) => {
        setInput(e.target.value)
    }

    useEffect(() => {
        if (input !== '') {
            setData(null)
            setLoadingRotation(true)
            const data = {
                date: input
            }


            http.post('/api/admin/reservation', data)
                .then(res => {
                    setData(() => {
                        const copy = {...res.data}
                        let morning = 0
                        let evening = 0

                        copy.morning?.forEach(el => {
                            morning += el.customerNumber
                            if (el.hour !== null) {
                                const date = new Date(el.hour)
                                el.hour = date.getHours() + 'h' + date.getMinutes()
                            }
                        })

                        copy.evening?.forEach(el => {
                            evening += el.customerNumber
                            if (el.hour !== null) {
                                const date = new Date(el.hour)
                                el.hour = date.getHours() + 'h' + date.getMinutes()
                            }
                        })
                        setMaxMorning(morning)
                        setMaxEvening(evening)
                        return copy
                    })
                })
                .finally(() => setLoadingRotation(false))

        }
    }, [input])

    const handleMaxSubmit = (e) => {
        e.preventDefault()

        const data = {
            max: maxRef.current.value
        }

        http.post('/api/admin/update-max', data)
    }

    return (
        <>
            <Header isAdmin={isAdmin} user={user} />
            <Container className={'mainContainer'}>


                <form onSubmit={handleMaxSubmit}>
                    <label className={'text-primary merri my-3'}>Modifier le nombre max de clients du restaurant : </label>
                    <input ref={maxRef} className={'form-control'} type={'number'} min={0} required={true} />
                    <button className={'btn btn-primary w-100 shadow1 my-4'}>Enregistrer</button>
                </form>

                <h2 className={'merri text-primary my-4'}>Voir les réservations</h2>

                <form>
                    <input onChange={handleInput} value={input} className={'form-control my-4'} type={'date'} />
                </form>

                {loadingRotation
                    ? (<LoadingFetch message={'Chargement des réservations ...'} /> )
                    : (
                        <>
                            {(data?.morning === null && data?.evening === null)  &&
                                <div className={'alert alert-warning'}>
                                    <p>Aucune réservations pour ce jour.</p>
                                </div>
                            }

                            {data?.morning?.length > 0 && (
                                <>
                                    <p>Réservation du midi : {maxMorning} clients</p>

                                    {data.morning.map(el => {
                                        return (
                                            <div className={'border border-primary rounded my-4 p-3 shadow1'} key={el.id}>
                                                <p>Heure de la réservation : {el.hour}</p>
                                                <p>Nombre de convives : {el.customerNumber}</p>
                                                <p>Allergie : {el.allergens}</p>
                                            </div>
                                        )
                                    })}
                                </>
                            )}

                            {data?.evening?.length > 0 && (
                                <>
                                    <p className={'text-secondary merri mt- 4'}>Réservations du soir : {maxEvening} clients</p>

                                    {data.evening.map(el => {
                                        console.log(typeof el.hour)
                                        return (
                                            <div className={'border border-primary rounded my-4 p-3 shadow1'} key={el.id}>
                                                <p>Heure de la réservation : {el.hour}</p>
                                                <p>Nombre de convives : {el.customerNumber}</p>
                                                <p>Allergies : {el.allergens !== null ? el.allergens : 'Aucune allergies'}</p>
                                            </div>
                                        )
                                    })}
                                </>
                            )}
                        </>
                    )
                }



            </Container>
            <Footer horaires={horaires} />
        </>
    )
}