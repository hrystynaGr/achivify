import User from "../models/User";
import configs from "../config";

export const userLoad = async (componentInstance) => {
    const ui = localStorage.getItem("userId")
    const Us = new User({ userId: ui });
    await Us.fetchData();
    componentInstance.setState({ user: Us.data })
}

export const logOut = async (componentInstance) => {
    componentInstance.setState({ user: {}, isLoggedIn: false });
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
}

export const logIn = async (componentInstance) => {
    fetch(`${configs.local_api}/users?email=${componentInstance.state.email}&password=${componentInstance.state.password}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                localStorage.setItem('token', JSON.stringify(new Date()));
                const { id } = data[0];
                componentInstance.props.grabId(id);
                window.dispatchEvent(new Event("storage"));
            }
        })
}

export const isLoggedIn = async (componentInstance) => {
    const isLoggedIn = !!localStorage.getItem('token')
    componentInstance.setState({ isLoggedIn: isLoggedIn });
}
