import React, { Component } from 'react';
//didn'k work, can't figure our why
// import { redirect } from 'react-router'

import './login.scss';
import { AchivifyContext } from '../../MyContext';
import CInput from '../../atoms/c-input/c-input';
import CButton from '../../atoms/c-button/c-button';
import { logIn } from '../../helpers/user';

class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    loggingIn = () => {
        logIn(this);
    }

    handleMailChange = (val) => {
        this.setState({ email: val });
    }

    handlePassChange = (val) => {
        this.setState({ password: val });
    }

    render() {
        return (
            <div className="Login" theme={this.context.theme}>
                <CInput type="email" func={this.handleMailChange} />
                <CInput type="password" func={this.handlePassChange} />
                <CButton innerText="Submit" styling="submit" onClick={this.loggingIn} />
            </div>
        );
    }
}

Login.contextType = AchivifyContext;

export default Login;
