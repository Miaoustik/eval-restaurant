import React, {useEffect, useRef, useState} from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import reserver from "../../images/reserver-1920.jpg"
import styled from "styled-components";
import {Container} from "react-bootstrap";
import useControllerRef from "../Hooks/useControllerRef";
import LoadingFetch from "../Components/Ui/LoadingFetch";
import useRotationRepository from "../Hooks/Repository/useRotationRepository";
import {format, toDate} from "../Components/Utils/formatHoraire";
import useHeightTransition from "../Hooks/useHeightTransition";
import HeightTransition from "../Components/Ui/HeightTransition";
import useMaxCustomerRepository from "../Hooks/Repository/useMaxCustomerRepository";
import useScrollToTop from "../Hooks/useScrollToTop";

const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

export default function ({horaires, user, isAdmin, userRepository}) {

    const scrollToTop = useScrollToTop()

    const controllerRef = useControllerRef()
    const {repository, rotation, setRotation} = useRotationRepository(controllerRef)
    const [dateInput, setDateInput] = useState('')
    const [errorDate, setErrorDate] = useState(false)
    const [morning, setMorning] = useState([])
    const [evening, setEvening] = useState([])
    const [loadingRotation, setLoadingRotation] = useState(false)
    const [choice, setChoice] = useState(null)
    const {maxCustomer, repository: maxRepository} = useMaxCustomerRepository(controllerRef)
    const [loadingMax, setLoadingMax] = useState(true)
    const conviveRef = useRef()
    const allergenRef = useRef()
    const [submitted, setSubmitted ] = useState(false)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [errorSubmit, setErrorSubmit] = useState(null)
    const [userDefault, setUserDefault] = useState(null)

    const {show: showMorning, toggleShow: toggleShowMorning, setShow: setShowMorning} = useHeightTransition()
    const {show: showEvening, toggleShow: toggleShowEvening, setShow: setShowEvening} = useHeightTransition()


    useEffect(() => {
        if (user) {
            userRepository.getUserInfo({
                email: user
            }, controllerRef)
                .then(res => {
                    setUserDefault(res.data)
                })
        }
        maxRepository.get()
            .finally(() => setLoadingMax(false))
    }, [])

    useEffect(() => {
        if (rotation !== null) {
            const date = new Date(dateInput)

            const day = days[date.getDay()]
            const horaire = horaires.filter(el => el.dayName === day)[0]

            let morning = null
            let evening = null

            function setRotation (start, end, setter) {
                setter(() => {
                    const news = []
                    const cloneStart = new Date(start.getTime())
                    const cloneEnd = new Date(end.getTime())
                    cloneEnd.setHours(cloneEnd.getHours() - 1)

                    while (cloneStart <= cloneEnd) {
                        if ((new Date() < cloneStart) ) {
                            news.push(cloneStart.getHours() + ':' + (cloneStart.getMinutes() < 10 ? ('0' + cloneStart.getMinutes()) : cloneStart.getMinutes()))
                        }
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
        }
    }, [rotation])

    useEffect(() => {
        setErrorDate(null)
        if (dateInput !== '') {
            setLoadingRotation(true)
            setRotation(null)
            setMorning([])
            setEvening([])
            const date = new Date(dateInput)
            date.setHours(0)

            const newDate = new Date()
            newDate.setHours(0)
            newDate.setMinutes(0)
            newDate.setSeconds(0)
            newDate.setMilliseconds(0)

            if (date < newDate) {
                setErrorDate("Date antérieur à aujourd'hui")
                setLoadingRotation(false)
            } else {
                const data = {
                    date: dateInput,
                    hour: new Date().toString()
                }


                repository.get(data)
                    .finally(() => setLoadingRotation(false))
            }
        }
    }, [dateInput])


    const handleDateInput = (e) => {
        setDateInput(e.target.value)
    }

    const handleChoice = (e) => {
        e.preventDefault()
        setChoice(e.target.getAttribute('data-horaire'))
        closeShows()
    }

    const closeShows = () => {
        setShowMorning(prevState => {
            const news = {...prevState}
            news['1'] = false
            return news
        })
        setShowEvening(prevState => {
            const news = {...prevState}
            news['1'] = false
            return news
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        scrollToTop()
        setLoadingSubmit(true)
        setSubmitted(false)
        setErrorSubmit(null)

        const obj = {
            dateInput,
            choice,
            id: 'new',
            convive: conviveRef.current.value,
            allergen: allergenRef.current.value,
            morning: morning.includes(choice),
        }

        console.log(obj)

        repository.reserver(obj)
            .then((res) => {
                if (res.ok) {
                    closeShows()
                    setDateInput('')
                    setMorning([])
                    setEvening([])
                    setChoice(null)
                    setRotation(null)
                    setSubmitted(true)
                } else {
                    setErrorSubmit(res.data.errorMessage)
                }

            })
            .finally(() => {

                setLoadingSubmit(false)
            })

    }


    return (
        <>
            <Header user={user} isAdmin={isAdmin} />
            <Main className={'mainContainer d-flex align-items-center min-h-100'}>
                <Container>
                    <FormDiv>
                        <h2 className={'text-center merri text-primary mb-4'}>Reservation</h2>
                        {loadingMax || loadingSubmit
                            ? (<LoadingFetch message={'Chargement ...'} />)
                            : (
                                <>
                                    <form onSubmit={handleSubmit}>
                                        {submitted &&
                                            <div className={'alert alert-success mukta'}>
                                                Votre réservation a bien été prise en compte.
                                            </div>
                                        }
                                        {errorSubmit &&
                                            <div className={'alert alert-danger mukta'}>
                                                {errorSubmit}
                                            </div>
                                        }
                                        <div>
                                            <label className={'merri text-primary mb-2'}>Date de la réservation : </label>
                                            <input  value={dateInput} onChange={handleDateInput} className={'form-control border border-primary shadow1'} type={'date'} required/>
                                        </div>
                                        {loadingRotation
                                            ? (
                                                <LoadingFetch message={'Chargement...'} />
                                            )
                                            : (
                                                <>

                                                    {errorDate
                                                        ? (
                                                            <div className={'alert alert-danger mt-4'}>
                                                                Date antérieure à aujourd'hui.
                                                            </div>
                                                        )
                                                        : (
                                                            <>
                                                                {rotation !== null &&
                                                                    <>
                                                                        {(morning.length === 0 && evening.length === 0)
                                                                            ? (
                                                                                <div className={'mt-4 alert alert-info mukta'}>
                                                                                    Aucune réservation disponnible.
                                                                                </div>
                                                                            )
                                                                            : (
                                                                                <>
                                                                                    <div>
                                                                                        <label className={'merri text-primary mt-4'}>Heure de la réservation : </label>
                                                                                        {morning.length > 0 &&
                                                                                            <>
                                                                                                <button data-id={'1'} onClick={toggleShowMorning} className={'btn btn-primary w-100 shadow1'}>Midi</button>
                                                                                                <HeightTransition show={showMorning['1']}>
                                                                                                    <div className={'pt-4 d-flex flex-wrap justify-content-between'}>
                                                                                                        {morning.map(el => {
                                                                                                            return (
                                                                                                                <button onClick={handleChoice} data-horaire={el} className={'btn-secondary btn m-2'} key={el}>{el}</button>
                                                                                                            )
                                                                                                        })}
                                                                                                    </div>
                                                                                                </HeightTransition>
                                                                                            </>
                                                                                        }

                                                                                        {evening.length > 0 &&
                                                                                            <>
                                                                                                <button data-id={'1'} onClick={toggleShowEvening} className={'btn btn-primary w-100 shadow1 mt-2 merri'}>Soir</button>

                                                                                                <HeightTransition show={showEvening["1"]}>
                                                                                                    <div className={'pt-4 d-flex flex-wrap justify-content-between'}>
                                                                                                        {evening.length > 0 && evening.map(el => {
                                                                                                            return (
                                                                                                                <button onClick={handleChoice} data-horaire={el} className={'btn-secondary btn m-2'} key={el}>{el}</button>
                                                                                                            )
                                                                                                        })}
                                                                                                    </div>
                                                                                                </HeightTransition>
                                                                                            </>
                                                                                        }
                                                                                    </div>

                                                                                    {choice !== null &&
                                                                                        <>
                                                                                            <div className={'mt-4'}>
                                                                                                <p className={'merri text-primary'}>Heure choisie: <span className={'merri text-secondary'}>{choice}</span></p>
                                                                                            </div>
                                                                                            <div className={'mt-4'}>
                                                                                                <label className={'merri text-primary mb-2'}>Nombres de convives : </label>
                                                                                                <input ref={conviveRef} defaultValue={userDefault?.convive ?? ''} className={'form-control border border-primary shadow1'} type={'number'} min={1} max={rotation?.rotation === '0' ? maxCustomer.value : (morning.includes(choice) ? (maxCustomer.value - rotation.morning) : (maxCustomer.value - rotation.evening))} required={true}/>
                                                                                            </div>
                                                                                            <div>
                                                                                                <label className={'merri text-primary mt-2 mb-2'}>Si vous avez des allergies : </label>
                                                                                                <input ref={allergenRef} defaultValue={userDefault?.allergen ?? ''} placeholder={'Noix, ...'}  className={'form-control border border-primary shadow1'} type={'text'} />
                                                                                            </div>
                                                                                            <button className={'btn btn-secondary w-100 merri shadow1 my-4'} type={'submit'}>Réserver</button>
                                                                                        </>
                                                                                    }
                                                                                </>
                                                                            )
                                                                        }
                                                                    </>
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </>
                                            )
                                        }
                                    </form>
                                </>
                            )
                        }

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