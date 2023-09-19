export function isObjEmpty(obj) {
    return !!Object.keys(obj).length;
}

export function pageName() {
    return window.location.pathname.split('/')[1]
}
