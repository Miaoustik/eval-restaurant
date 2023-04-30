import {useEffect, useState} from "react";
import useHoraireRepository from "./Repository/usehoraireRepository";

export default function (controllerRef) {
    
    const {
        horaires,
        repository
    } = useHoraireRepository(controllerRef)

    const [ loading, setLoading ] = useState(true)


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
        repository.getAllParsed(parseHoraires)
            .finally(() => setLoading(false))
    }, [])

    return [horaires, loading]
}