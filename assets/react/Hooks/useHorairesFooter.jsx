import {useEffect, useState} from "react";
import httpApi from "../Components/Utils/httpApi";

export default function (controllerRef) {

    const http = httpApi(controllerRef)
    
    const [ horaires, setHoraires ] = useState(null)
    const [ loading, setLoading] = useState(true)
    const [ error, setError] = useState(null)

    function parseHoraires (data) {

        function buildHoraire (start = null, end = null) {

            function getHoursMins(date) {
                return date.getHours() + 'h' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
            }

            if (start !== null && end !== null) {
                const horaireStart = new Date(start)
                const horaireEnd = new Date(end)
                return getHoursMins(horaireStart) + ' à ' + getHoursMins(horaireEnd)
            }
            return null
        }

        return data.map(e => {

            let evening = buildHoraire(e.eveningStart, e.eveningEnd);
            let morning = buildHoraire(e.morningStart, e.morningEnd);

            if (evening !== null) {
                morning += ' et'
            }

            return {
                dayName: e.dayName,
                morning,
                evening
            }
        })
    }

    useEffect(() => {
        http.get('/api/horaire')
            .then(res => {
                if (!res.ok) {
                    setError(res.errorMessage)
                } else {
                    setError(null)
                    setHoraires(parseHoraires(res.data))
                }
            })
            .finally(() => setLoading(false))
    }, [])

    return [horaires, loading, error]
}