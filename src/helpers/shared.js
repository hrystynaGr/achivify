export function isObjEmpty(obj) {
    if(obj) {
        return !!Object.keys(obj)?.length;
    }
    else {
        return true
    }
    
}

export function pageName() {
    return window.location.pathname.split('/')[1]
}
