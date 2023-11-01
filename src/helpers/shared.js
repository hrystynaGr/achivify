//accepts: object
//returns: true - if no object passed or if passed object is empty
// false - if object is NOT empty
export function isObjEmpty(obj) {
    if (obj) {
        return !Boolean(Object.keys(obj)?.length)
    } else {
        return false
    }
}

//accepts: nothing
//returns: todays' date in 'dd/mm/yyyy' format
export function formattedToday() {
    const currentDate = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);
    return formattedDate;
}

//accepts: string "hh:mm" 
//returns: numbers in munutes
export function parseTimeToMinutes(timeStudied) {
    const hhmm = timeStudied.split(':');
    const result = (+hhmm[0] * 60) + +hhmm[1];
    return result;
}

//accepts: string "dd/mm/yyyy" 
//returns: days in "dd"
export function dayFromDate(date) {
    const parse = date.split('/');
    return Number(parse[0]);
}

//accepts: string "dd/mm/yyyy" 
//returns: days in "mm"
export function monthFromDate(date) {
    const parse = date.split('/');
    return Number(parse[1]);
}

//accepts: string "dd/mm/yyyy" 
//returns: days in "yyyy"
export function yearFromDate(date) {
    const parse = date.split('/');
    return Number(parse[2]);
}