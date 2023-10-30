import User from "../models/User";
import configs from "../config";

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
    try {
        const ui = localStorage.getItem("userId")
        const Us = new User({ userId: ui });
        await Us.fetchData();
        return Us.data;
    }
    catch (error) {
        console.error('Error in userLoad:', error);
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

// loggs in the user
// expected responce: success - userID, faluire: false
export const logIn = async (componentInstance) => {
    //In a real world i would never send password via GET request
    try {
        const response = await fetch(`${configs.local_api}/users?email=${componentInstance.email}&password=${componentInstance.password}`);
        const fetchedData = await response.json();
        if (fetchedData.length > 0) {
            const { id } = fetchedData[0];
            localStorage.setItem('userId', id);
            localStorage.setItem('token', JSON.stringify(new Date()));
            window.dispatchEvent(new Event('newUser'));
            return id;
        }

    }
    catch (error) {
        console.error('Failed to GET from /users', error);
        return false;
    }
}

// checks if user is logged in
// expected responce: true/false
export const isLoggedIn = async () => {
    const isLoggedIn = !!localStorage.getItem('token');
    return isLoggedIn;
}

// creates account fro the new user AND
// create empty entries for user in timeStudied and usersMilestones
// expected responce: success - redirects to LogIn function and it responds
// failure - false;
export const signIn = async (componentInstance) => {
    try {
        const data = {
            name: componentInstance.name,
            email: componentInstance.email,
            theme: 'dark',
            password: componentInstance.password,
        };
        const response = await fetch(`${configs.local_api}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        else {
            const userId = await logIn(componentInstance);
            createUserInTimeStudied(userId);
            createUsersMilestones(userId);
        }
    }
    catch (error) {
        console.error('Failed to POST to /users', error);
        return false;
    };
}

// creates milestones entry in UsersMilestones for the new User
// expected responce: success: returns entry in UsersMilestones
// failure: false
export const createUsersMilestones = async (data) => {
    try {
        const params = {
            "userid": data,
            "milestones": [
                {
                    "junior": {
                        "common": [],
                        "JScore": [],
                        "functions": [],
                        "front-end": [],
                        "layout": [],
                        "react": [],
                        "instruments": [],
                        "practice": []
                    }
                },
                {
                    "middle": {
                        "common": [],
                        "JScore": [],
                        "functions": [],
                        "front-end": [],
                        "layout": [],
                        "react": [],
                        "instruments": [],
                        "practice": []
                    }
                },
                {
                    "senior": {
                        "common": [],
                        "JScore": [],
                        "front-end": [],
                        "instruments": [],
                        "practice": []
                    }
                }
            ],

        }

        const response = await fetch(`${configs.local_api}/usersMilestones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        else {
            return await response.json();
        }
    }
    catch (error) {
        console.error('Failed to POST to /usersMilestones', error);
        return false;
    }
}

// loads userMilestones for the current user
// expected output: milestones fror current user
// failure: false
export const loadUsersMilestones = async (userId) => {
    try {
        const response = await fetch(`${configs.local_api}/usersMilestones?userid=${userId}`);
        const fetchedData = await response.json();
        return fetchedData[0];
    }
    catch (error) {
        console.error('Failed to GET from /usersMilestones', error);
        return false;
    }
}

// updates userMilestones for the current user
// expected output: updated milestones
// failure: false
export const changeUserMilestones = async (componentInstance) => {
    try {
        const data = {
            userid: componentInstance?.user?.id,
            milestones: componentInstance?.userMilestones
        };
        const response = await fetch(`${configs.local_api}/usersMilestones/${componentInstance?.userMilestonesId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        else {
            return await response.json();
        }
    }
    catch (error) {
        console.error('Failed to PUT to /usersMilestones', error);
        return false;
    };

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
        const data = {
            userid: user,
            studies: [],
        }
        const response = await fetch(`${configs.local_api}/timeStudied`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
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
        const params = {
            userid: data.userid,
            studies: data.studies,
        }
        const response = await fetch(`${configs.local_api}/timeStudied/${data.entryId}`, {
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
        const response = await fetch(`${configs.local_api}/timeStudied?userid=${user.id}`)
        const fetchedData = await response.json()
        return fetchedData[0];
    }
    catch (error) {
        console.error('Failed to GET from /timeStudied (error in loadUsersTimeStudiedd)', error)
        return false
    }
}
