import { Component } from "react";
import configs from "../config";

class User extends Component {

    constructor(props) {
        super(props);
        this.userId = props.userId;
        this.data = {};
    }

    async fetchData() {
        try {
            const response = await fetch(`${configs.local_api}/users?id=${this.userId}`);
            const userData = await response.json();
            this.data = userData[0];
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    get name() {
        return this.data.name
    }

    get mail() {
        return this.data.email
    }

    get theme() {
        return this.data.theme
    }

}

export default User;