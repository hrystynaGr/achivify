//accepts: object
//returns: true - if no object passed or if passed object is empty
//returns: false - if object is NOT empty
export function isObjEmpty(obj) {
    return !Boolean(Object.keys(obj)?.length)
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
    const result = (+hhmm[0]*60) + +hhmm[1];
    return result;
}

export function dayFromDate(date) {
    const parse = date.split('/');
    return  Number(parse[0]);
}