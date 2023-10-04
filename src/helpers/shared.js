export function isObjEmpty(obj) {
    if(obj) {
        return !!Object.keys(obj)?.length;
    }
    else {
        return true
    }
    
}

