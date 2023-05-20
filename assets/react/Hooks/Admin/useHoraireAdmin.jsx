import {useEffect, useState} from "react";
import {format} from "../../Components/Utils/formatHoraire";
const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

export default function (controllerRef, horaires, repository) {

    const [newHoraire, setNewHoraire] = useState({})
    const [formError, setFormError] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [submitError, setSubmitError] = useState(false)
    const [submittedOk, setSubmittedOk] = useState(false)

    useEffect(() => {
        setLoaded(false)
        if (horaires?.length > 0) {
            setNewHoraire(prev => {
                const news = {...prev}

                horaires.forEach((el, k) => {

                    const day = el.dayName

                    let morningClosed = false
                    let eveningClosed = false

                    if (horaires[k].morning === null || horaires[1].morning === null) {
                        morningClosed = true
                    }

                    if (horaires[k].evening === null || horaires[1].evening === null) {
                        eveningClosed = true
                    }

                    const morning = format(horaires[k].morning)
                    const evening = format(horaires[k].evening)

                    news[day] = {
                        morningStart: morning[0],
                        morningEnd: morning[1],
                        eveningStart: evening[0],
                        eveningEnd: evening[1],
                        morningClosed: morningClosed,
                        eveningClosed: eveningClosed
                    }
                })
                return news
            })
            setLoaded(true)
        } else {
            setNewHoraire(prev => {
                const news = {...prev}
                days.forEach(day => {
                    news[day] = {
                        morningStart: '',
                        morningEnd: '',
                        eveningStart: '',
                        eveningEnd: '',
                        morningClosed: true,
                        eveningClosed: true
                    }
                })
                return news
            })

            setLoaded(true)
        }
    }, [horaires])

    const handleChange = (e) => {
        const day = e.target.getAttribute('data-day')
        const name = e.target.name
        const value = e.target.value
        setNewHoraire(prev => {
            const news = {...prev}
            news[day][name] = value
            return news
        })
    }

    const handleCheck = (e) => {
        const day = e.target.getAttribute('data-day')
        const name = e.target.name

        setNewHoraire(prev => {
            const news = {...prev}
            news[day][name] = !news[day][name]
            return news
        })
    }

    const handleBlur = (e) => {

        const setError = (day, string, message) => {
            setFormError(prev => {
                const news = {...prev}
                const obj = {...news[day]}
                obj[string] = message
                news[day] = obj
                return news
            })
        }

        const day = e.target.getAttribute('data-day')

        setError(day, 'morning', null)
        setError(day, 'evening', null)


        const toDate = (horaire) => {
            const date = new Date()
            const splitHoraire = horaire.split(':')
            date.setHours(parseInt(splitHoraire[0], 10))
            date.setMinutes(parseInt(splitHoraire[1], 10))
            return date
        }

        const firstCheck = (start, end, day, string) => {
            if ((end - start) < 0) {
                setError(day, string, "L'heure de début est supérieure à l'heure de fin.")
            } else if ((end - start) === 0) {
                setError(day, string, "L'heure de début est égale à l'heure de fin.")
            }
        }

        let morningStart = null
        let morningEnd = null

        if (newHoraire[day].morningStart || newHoraire[day].morningEnd) {
            if (!(newHoraire[day].morningStart && newHoraire[day].morningEnd)) {
                setError(day, 'morning', 'Les deux champs début et fin doivent être remplis.')

            } else {
                morningStart = toDate(newHoraire[day].morningStart)
                morningEnd = toDate(newHoraire[day].morningEnd)

                firstCheck(morningStart, morningEnd, day, 'morning')
            }
        }

        let eveningStart = null
        let eveningEnd = null

        if (newHoraire[day].eveningStart || newHoraire[day].eveningEnd) {
            if (!(newHoraire[day].eveningStart && newHoraire[day].eveningEnd)) {
                setError(day, 'evening', 'Les deux champs début et fin doivent être remplis.')

            } else {
                eveningStart = toDate(newHoraire[day].eveningStart)
                eveningEnd = toDate(newHoraire[day].eveningEnd)

                firstCheck(eveningStart, eveningEnd, day, 'evening')
            }
        }


        if (!morningStart || !morningEnd || !eveningStart || !eveningEnd) {
            return null
        }


        if (eveningStart - morningStart < 0) {
            setError(day, 'evening', "L'heure de début du soir est inférieure à l'heure de début du midi.")
            setError(day, 'morning', "L'heure de début du soir est inférieure à l'heure de début du midi.")
        }

        if (eveningStart - morningEnd < 0) {
            setError(day, 'evening', "L'heure de début du soir est inférieure à l'heure de fin du midi.")
            setError(day, 'morning', "L'heure de début du soir est inférieure à l'heure de fin du midi.")
        }

        if (eveningEnd - morningStart < 0) {
            setError(day, 'evening', "L'heure de fin du soir est inférieure à l'heure de début du midi.")
            setError(day, 'morning', "L'heure de fin du soir est inférieure à l'heure de début du midi.")
        }

        if (eveningEnd - morningEnd < 0) {
            setError(day, 'evening', "L'heure de fin du soir est inférieure à l'heure de fin du midi.")
            setError(day, 'morning', "L'heure de fin du soir est inférieure à l'heure de fin du midi.")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let error = null
        setSubmitError(false)
        setSubmittedOk(false)

        Object.values(formError).forEach(el => {
            Object.values(el).forEach(ell => {
                if (ell !== null) {
                    setSubmitError(true)
                    error = true
                }
            })
        })

        if (error === true) {
            return null
        }

        const data = {}

        days.forEach(day => {
            data[day] = {
                morningStart: newHoraire[day].morningClosed ? '' : newHoraire[day].morningStart,
                morningEnd: newHoraire[day].morningClosed ? '' : newHoraire[day].morningEnd,
                eveningStart: newHoraire[day].eveningClosed ? '' : newHoraire[day].eveningStart,
                eveningEnd: newHoraire[day].eveningClosed ? '' : newHoraire[day].eveningEnd,
                morningClosed: newHoraire[day].morningClosed,
                eveningClosed: newHoraire[day].eveningClosed
            }
        })

        repository.modify(data)
            .then(() => setSubmittedOk(true))
            .then(() => repository.getAllParsed())
    }

    return {
        horaires,
        handleSubmit,
        newHoraire,
        handleChange,
        loaded,
        formError,
        handleCheck,
        handleBlur,
        submitError,
        submittedOk
    }
}