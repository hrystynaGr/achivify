
import configs from '../config';

// loads data about user currently logged in
// expected responce:
// {
//     "id": Number,
//     "name": String,
//     "email": String,
//     "password": String,
//     "theme": "light/dark"
//  },
export const userLoad = async () => {
    const userid = localStorage.getItem('userId')
    try {
        const response = await fetch(`${configs.local_api}/users?id=${userid}`);
        const userData = await response.json();
        return userData[0];
    } catch (error) {
        console.error('Error fetching user data in userLoad:', error);
    }
}

// loggs out the user
// expected responce: true/false
export const logOut = async () => {
    try {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        return true;
    }
    catch (error) {
        console.error('Failed to log out user.', error);
        return false;
    }
}


// creates entry in TimesStudied for user which didn't have it before
// expected output: success: entry which was posted
// format: 
// {
//     "userid": number,
//     "studies": [],
//     "id": number
// }
// failure: false
export const createUserInTimeStudied = async (user) => {
    try {
        const fetchUrl = `${configs.local_api}/timeStudied`;
        const params = {
            userid: user,
            studies: [],
        }
        const response = await fetch(fetchUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        else {
            const rsp = await response.json();
            return rsp;
        }
    }
    catch (error) {
        console.error('Failed to POST to /timeStudied (error in addEntryForUserInTimeStudied)', error);
        return false;
    }

}

// updates entry in UserTimeStudied for current user 
// expected output: success: entry which was posted
// failure: false
export const updateEntryForUserInTimeStudied = async (data) => {
    try {
        const fetchUrl = `${configs.local_api}/timeStudied/${data.entryId}`;
        const params = {
            userid: data.userid,
            studies: data.studies,
        }
        const response = await fetch(fetchUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        else {
            const result = await response.json();
            return result;
        }
    }
    catch (error) {
        console.error('Failed to PUT to /timeStudied (error in addEntryForUserInTimeStudied)', error);
        return false;
    }
}

// load users enries from TimeStudies
// expected output: success- entry in TimeStudies for current user
// failure: false
export const loadUsersTimeStudied = async (user) => {
    try {
        const fetchUrl = `${configs.local_api}/timeStudied?userid=${user.id}`
        const response = await fetch(fetchUrl)
        const fetchedData = await response.json()
        return fetchedData[0];
    }
    catch (error) {
        console.error('Failed to GET from /timeStudied (error in loadUsersTimeStudiedd)', error)
        return false
    }
}
