import { Component } from "react";

import { signIn } from "../../helpers/user";
import './sign-in.scss';

import CInput from "../../atoms/c-input/c-input";
import CButton from "../../atoms/c-button/c-button";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            email: '',
        }
    }

    handleMailChange = (val) => {
        this.setState({ email: val });
    }

    handlePassChange = (val) => {
        this.setState({ password: val });
    }

    handleNameChange = (val) => {
        this.setState({ name: val });
    }

    signIn = () => {
        signIn(this);
    }

    render() {
        return (
            <div className="signIn">
                <CInput type="name" func={this.handleNameChange} />
                <CInput type="email" func={this.handleMailChange} />
                <CInput type="password" func={this.handlePassChange} />
                <CButton innerText="Submit" styling="submit" onClick={this.signIn} />
            </div>
        )
    }
}

export default SignIn;