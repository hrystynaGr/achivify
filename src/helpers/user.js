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
        await fetch(`${configs.local_api}/users?email=${componentInstance.state.email}&password=${componentInstance.state.password}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const { id } = data[0];
                    localStorage.setItem('userId', id);
                    localStorage.setItem('token', JSON.stringify(new Date()));
                    window.dispatchEvent(new Event('newUser'));
                    return id;

                }
            })
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
        await fetch(`${configs.local_api}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                logIn(componentInstance);
            })
    }
    catch (error) {
        console.error('Failed to POST to /users', error);
    };


}

export const usersMilestones = async (userId) => {
    try {
        return await fetch(`${configs.local_api}/usersMilestones?userid=${userId}`)
            .then(response => response.json())
            .then(data => {
                return data[0];
            })
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
        await fetch(`${configs.local_api}/usersMilestones/${componentInstance?.userMilestonesId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
    }
    catch (error) {
        console.error('Failed to PUT to /usersMilestones', error);
    };

}

