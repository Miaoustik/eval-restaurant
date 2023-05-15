import React, {useEffect, useState} from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import reserver from "../../images/reserver-1920.jpg"
import styled from "styled-components";
import {Container} from "react-bootstrap";
import Input from "../Components/Ui/Input";
import useControllerRef from "../Hooks/useControllerRef";
import LoadingFetch from "../Components/Ui/LoadingFetch";
import useRotationRepository from "../Hooks/Repository/useRotationRepository";
import {format, toDate} from "../Components/Utils/formatHoraire";

const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

export default function ({horaires, user, isAdmin}) {

    const controllerRef = useControllerRef()
    const {repository, rotation} = useRotationRepository(controllerRef)
    const [dateInput, setDateInput] = useState('')
    const [errorDate, setErrorDate] = useState(false)
    const [morning, setMorning] = useState([])
    const [evening, setEvening] = useState([])


    useEffect(() => {
        if (rotation) {
            const date = new Date(dateInput)
            const day = days[date.getDay()]
            const horaire = horaires.filter(el => el.dayName === day)[0]

            let morning = null
            let evening = null

            function setRotation (start, end, setter) {
                setter(prevState => {
                    const news = [...prevState]
                    const cloneStart = new Date(start.getTime())
                    const cloneEnd = new Date(end.getTime())
                    cloneEnd.setHours(cloneEnd.getHours() - 1)

                    while (cloneStart <= cloneEnd) {
                        news.push(cloneStart.getHours() + ':' + (cloneStart.getMinutes() < 10 ? ('0' + cloneStart.getMinutes()) : cloneStart.getMinutes() ))
                        cloneStart.setMinutes(cloneStart.getMinutes() + 15)
                    }

                    return news
                })
            }

            if (horaire.morning !== null) {
                morning = format(horaire.morning)
                const morningStart = toDate(morning[0] + ':00:000', new Date(date.getTime()))
                const morningEnd = toDate(morning[1] + ':00:000', new Date(date.getTime()))

                setRotation(morningStart, morningEnd, setMorning)
            }

            if (horaire.evening !== null) {
                evening = format(horaire.evening)
                const eveningStart = toDate(evening[0] + ':00:000', new Date(date.getTime()))
                const eveningEnd = toDate(evening[1] + ':00:000', new Date(date.getTime()))

                setRotation(eveningStart, eveningEnd, setEvening)
            }

            const newDate = new Date()
        }
    }, [rotation])


    const handleDateInput = (e) => {
        setDateInput(e.target.value)

        if (e.target.value === '') {
            return null
        }

        const date = new Date(e.target.value)
        date.setHours(0)

        const newDate = new Date()
        newDate.setHours(0)
        newDate.setMinutes(0)
        newDate.setSeconds(0)
        newDate.setMilliseconds(0)



        if (date < newDate) {
            setErrorDate("Date antérieur à aujourd'hui")
            console.log('Hier')
            return null
        }

        const data = {
            date: e.target.value,
            hour: new Date().toLocaleTimeString('fr-FR', {timeZone: 'Europe/paris'})
        }

        repository.get(data)
    }


    return (
        <>
            <Header user={user} isAdmin={isAdmin} />
            <Main className={'mainContainer d-flex align-items-center min-h-100'}>
                <Container>
                    <FormDiv>
                        <h2 className={'text-center'}>Reservation</h2>
                        <form>
                            <div>
                                <label>Date de la réservation : </label>
                                <input  value={dateInput} onChange={handleDateInput} className={'form-control border border-primary shadow1'} type={'date'} required/>
                            </div>
                            {rotation !== null &&
                                <>
                                    <div>
                                        <label>Heure de la réservation : </label>
                                        <button className={'btn btn-primary w-100 shadow1'}>Midi</button>

                                        {morning.map(el => {
                                            return (
                                                <button key={el}>{el}</button>
                                            )
                                        })}

                                        <button className={'btn btn-primary w-100 shadow1 mt-2'}>Soir</button>


                                        {evening.map(el => {
                                            return (
                                                <button key={el}>{el}</button>
                                            )
                                        })}
                                    </div>
                                    <div>
                                        <label>Nombres de convives : </label>
                                        <Input type={'number'} min={1} required={true}/>
                                    </div>
                                    <div>
                                        <label>Si vous avez des allergies : </label>
                                        <input  className={'form-control border border-primary shadow1'} type={'text'} />
                                    </div>
                                </>
                            }
                        </form>
                    </FormDiv>
                </Container>
            </Main>
            <Footer horaires={horaires} />
        </>
    )
}

const Main = styled.main`
    background: center / cover no-repeat url(${reserver});
    min-height: 100%;
`

const FormDiv = styled.div`
    border-radius: 15px;
    background-color: #FFFFFF51;
    backdrop-filter: blur(25px);
    padding: 2rem 1rem 2rem 1rem;
    margin: 2rem 0 2rem 0;
    
`