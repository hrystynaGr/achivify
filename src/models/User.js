import { Component } from "react";
import configs from "../config";

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
        }
        this.userId = props.userId;
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        try {
            const response = await fetch(`${configs.local_api}/users?id=${this.userId}`);
            const userData = await response.json();
            this.setState({data: userData[0]})
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    get name() {
        return this.state.data.name
    }

    get mail() {
        return this.state.data.mail
    }

    get theme() {
        return this.state.data.theme
    }

    render() {
        // Since you don't want this component to appear in the DOM, return null
        return (<h4>hiiiiiii</h4>);
      }

}

export default User;