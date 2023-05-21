export function format (string) {

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

export function toDate (horaire, date = null)  {
    if (date === null) {
        date = new Date()
    }
    const splitHoraire = horaire.split(':')
    date.setUTCHours(parseInt(splitHoraire[0], 10))
    date.setUTCMinutes(parseInt(splitHoraire[1], 10))
    if (splitHoraire[2]) {
        date.setUTCSeconds(parseInt(splitHoraire[2], 10))
    }
    if (splitHoraire[3]) {
        date.setUTCMilliseconds(parseInt(splitHoraire[3], 10))
    }
    return date
}