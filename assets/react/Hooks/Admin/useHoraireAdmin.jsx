import {useEffect, useRef, useState} from "react";

export default function (controllerRef, horaires, repository) {

    const [newHoraire, setNewHoraire] = useState({})
    const [formError, setFormError] = useState({})
    const [loaded, setLoaded] = useState(false)

    //TODO REF to save initial state of the form

    useEffect(() => {
        if (horaires.length > 0) {
            setNewHoraire(prev => {
                const news = {...prev}

                const format = (string) => {

                    if (string === null) {
                        return ''
                    }

                    let newString = string
                    if (string.substring(string.length - 2) === 'et') {
                        newString = string.substring(0, string.length - 3)
                    }
                    return newString.split('à').map(el => {
                        const trimed = el.trim()
                        return trimed.replace('h', ':')
                    })
                }

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

        const morningStart = toDate(newHoraire[day].morningStart)
        const morningEnd = toDate(newHoraire[day].morningEnd)

        firstCheck(morningStart, morningEnd, day, 'morning')

        const eveningStart = toDate(newHoraire[day].eveningStart)
        const eveningEnd = toDate(newHoraire[day].eveningEnd)

        firstCheck(eveningStart, eveningEnd, day, 'evening')

        if (eveningStart - morningStart < 0) {
            setError(day, 'evening', "L'heure de début du midi est inférieure à l'heure de début du matin.")
            setError(day, 'morning', "L'heure de début du midi est inférieure à l'heure de début du matin.")
        }

        if (eveningStart - morningEnd < 0) {
            setError(day, 'evening', "L'heure de début du midi est inférieure à l'heure de fin du matin.")
            setError(day, 'morning', "L'heure de début du midi est inférieure à l'heure de fin du matin.")
        }

        if (eveningEnd - morningStart < 0) {
            setError(day, 'evening', "L'heure de fin du midi est inférieure à l'heure de début du matin.")
            setError(day, 'morning', "L'heure de fin du midi est inférieure à l'heure de début du matin.")
        }

        if (eveningEnd - morningEnd < 0) {
            setError(day, 'evening', "L'heure de fin du midi est inférieure à l'heure de fin du matin.")
            setError(day, 'morning', "L'heure de fin du midi est inférieure à l'heure de fin du matin.")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {}

        horaires.forEach(el => {
            const day = el.dayName

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
            .then(res => {
                console.log(res)
                //TODO Backend and front return
            })

    }

    return {
        horaires,
        handleSubmit,
        newHoraire,
        handleChange,
        loaded,
        formError,
        handleCheck,
        handleBlur
    }
}