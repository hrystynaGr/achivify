import User from "../models/User";
import configs from "../config";

export const userLoad = async (componentInstance) => {
    const ui = localStorage.getItem("userId")
    const Us = new User({ userId: ui });
    await Us.fetchData();
    return  Us.data;
}

export const logOut = async () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
}

export const logIn = async (componentInstance) => {
    fetch(`${configs.local_api}/users?email=${componentInstance.state.email}&password=${componentInstance.state.password}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                console.log('data', data)
                const { id } = data[0];
                localStorage.setItem('userId', id);
                localStorage.setItem('token', JSON.stringify(new Date()));
                 window.dispatchEvent(new Event('newUser'));
                return id;
               
            }
        })
}

export const isLoggedIn = async () => {
    const isLoggedIn = !!localStorage.getItem('token');
    return isLoggedIn;
}

export const signIn = async (componentInstance) => {
    const data = {
        name: componentInstance.state.name,
        email: componentInstance.state.email,
        theme: 'dark',
        password: componentInstance.state.password,
    };

    fetch(`${configs.local_api}/users`, {
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
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

}

export const usersMilestones = async (userId) => {
    console.log("Inside Users milestones userId", userId)
    return await fetch(`${configs.local_api}/usersMilestones?userid=${userId}`)
        .then(response => response.json())
        .then(data => {
            return data[0];
        })
}

export const changeUserMilestones = async (componentInstance) => {
    const data = {
        // id: componentInstance?.userMilestonesId,
        userid: componentInstance?.context?.user?.id,
        milestones: componentInstance?.state?.usermilestones
    };
    fetch(`${configs.local_api}/usersMilestones/${componentInstance?.userMilestonesId}`, {
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
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

