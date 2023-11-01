import configs from '../../config';
import { isObjEmpty } from '../shared';

// loggs in the user
// expected responce: success - userID, faluire: false
export const logIn = async (inputValues) => {
    //In a real world I would never send password via GET request
    try {
        const user = await fetchUserData(inputValues);
        if (doesUserExist(user)) {
            addUserDataToLocalStorage(user);
            dispathLogInEvent();
            return user.id;
        }
    }
    catch (error) {
        console.error('Failed to GET from /users', error);
        return false;
    }
}

export const isLoggedIn = async () => {
    return Boolean(localStorage.getItem('token'))
}

async function fetchUserData(inputValues) {
    const fetcgUrl = `${configs.local_api}/users?email=${inputValues.email}&password=${inputValues.password}`
    const response = await fetch(fetcgUrl);
    const fetchedData = await response.json();
    return fetchedData[0];
}

function doesUserExist(userData) {
    return !isObjEmpty(userData)
}

function addUserDataToLocalStorage(user) {
    localStorage.setItem('userId', user.id);
    localStorage.setItem('token', JSON.stringify(new Date()));
}

function dispathLogInEvent() {
    window.dispatchEvent(new Event('logIn'));
}
