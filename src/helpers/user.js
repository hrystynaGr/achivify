import User from "../models/User";
import configs from "../config";

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

export const logOut = async () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
}

export const logIn = async (componentInstance) => {
    //In a real world i would never send password via GET request
    try {
        const response = await fetch(`${configs.local_api}/users?email=${componentInstance.state.email}&password=${componentInstance.state.password}`);
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
    }
}

export const isLoggedIn = async () => {
    const isLoggedIn = !!localStorage.getItem('token');
    return isLoggedIn;
}

export const signIn = async (componentInstance) => {
    try {
        const data = {
            name: componentInstance.state.name,
            email: componentInstance.state.email,
            theme: 'dark',
            password: componentInstance.state.password,
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
            logIn(componentInstance);
        }
    }
    catch (error) {
        console.error('Failed to POST to /users', error);
    };
}

export const createUsersMilestones = async (data) => {
    try {
        const params = {
            userid: data,
            milestones: []
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
    }
}

export const loadUsersMilestones = async (userId) => {
    try {
        const response = await fetch(`${configs.local_api}/usersMilestones?userid=${userId}`);
        const fetchedData = await response.json();
        if(!fetchedData.length) {
            return createUsersMilestones(userId)
        }
        else {
            return fetchedData[0];
        }
    }
    catch (error) {
        console.error('Failed to GET from /usersMilestones', error);
    }
}

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
    };

}

export const addEntryForUserInTimeStudied = async (user) => {
    try {
        const data = {
            userid: user.id,
            studies: [],
        }
        const entry = await doesUserHaveEntryTimeStudied(user);
        if (entry.length > 0) return entry[0];
        else {
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

    }
    catch (error) {
        console.error('Failed to PUT to /timeStudied (error in addEntryForUserInTimeStudied)', error);
    }
}

export const doesUserHaveEntryTimeStudied = async (user) => {
    try {
        const response = await fetch(`${configs.local_api}/timeStudied?userid=${user.id}`)
        const fetchedData = await response.json()
        return fetchedData;
    }
    catch (error) {
        console.error('Failed to GET from /timeStudied (error in doesUserHaveEntryTimeStudied)', error)
    }
}

export const loadUsersTimeStudied = async (user) => {
    try {
        const response = await fetch(`${configs.local_api}/timeStudied?userid=${user.id}`)
        const fetchedData = await response.json()
        if (!fetchedData.length) {
            //try to add an entry for a user in timeStudied
            const r = await addEntryForUserInTimeStudied(user);
            return r;
        }
        else {
            return fetchedData[0]
        }
    }
    catch (error) {
        console.error('Failed to GET from /timeStudied (error in loadUsersTimeStudiedd)', error)
    }
}

