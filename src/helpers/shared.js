export function isObjEmpty(obj) {
    if (obj) {
        return !!Object.keys(obj)?.length;
    }
    else {
        return true
    }

}

export function formattedToday() {
    const currentDate = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);
    return formattedDate;
}