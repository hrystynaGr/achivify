import configs from '../../config';
import { logIn } from './log-in';
import { createUserInTimeStudied, } from '../user';
import { createUserInUsersMilestones } from '../user/milestones'


// creates account fro the new user AND
// create empty entries for user in timeStudied and usersMilestones
// expected responce: success - redirects to LogIn function and it responds
// failure - false;
export const signIn = async (inputValues) => {
    try {
        const responce = await postDataAboutNewUser(inputValues);
        if (!responce.ok) {
            throw new Error('Network responce was not ok');
        }
        else {
            const userid = await logIn(inputValues);
            createEmptyEntriesForNewUser(userid);
        }
    }
    catch (error) {
        console.error('Failed to POST to /users', error);
        return false;
    };
}

async function postDataAboutNewUser(inputValues) {
    const fetchUrl = `${configs.local_api}/users`
    return await fetch(fetchUrl, formedRequest(inputValues));
}

function formedRequest(inputValues) {
    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: getBodyStringified(inputValues)
    }
    return request;
}

function getBodyStringified(inputValues) {
    const data = {
        name: inputValues.name,
        email: inputValues.email,
        theme: 'dark',
        password: inputValues.password,
    };
    return JSON.stringify(data);
}

function createEmptyEntriesForNewUser(userid) {
    createUserInTimeStudied(userid);
    createUserInUsersMilestones(userid);
}
