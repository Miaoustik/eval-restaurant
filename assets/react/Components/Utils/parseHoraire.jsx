const jourOrder = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

export default function (data) {

    if (data === null) {
        return null
    }

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

    const array1 = data.map(e => {

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



    const ordered = []

    for (let i = 0; i < 7; i++) {
        array1.forEach(el => {
            if (el.dayName === jourOrder[i]) {
                ordered.push(el)
            }
        })
    }

    return ordered
}