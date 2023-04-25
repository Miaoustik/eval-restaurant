import useFetch from "./useFetch";

export default function (controllerRef) {
    const [horaires, setHoraires, loading] = useFetch('/api/home/data', controllerRef, parseHoraires);

    function getHoursMins(date) {
        return date.getHours() + 'h' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    }

    function buildHoraire (start = null, end = null) {
        if (start !== null && end !== null) {
            const horaireStart = new Date(start)
            const horaireEnd = new Date(end)
            return getHoursMins(horaireStart) + ' à ' + getHoursMins(horaireEnd)
        }
        return null
    }

    function parseHoraires (data) {
        return data.map(e => {

            let evening = buildHoraire(e.eveningStart, e.eveningEnd);
            let morning = buildHoraire(e.morningStart, e.morningEnd);

            if (evening !== null) {
                morning += ' et'
            }

            return {
                dayName: e.dayName ,
                morning,
                evening
            }
        })
    }

    return [horaires, loading]
}