import React, { Component } from 'react';
import './login.scss';

import CInput from '../../atoms/c-input/c-input';
import CButton from '../../atoms/c-button/c-button';
import local_api from '../../config';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    loggingIn = () => {
        // Check if user with this pair login/password exists
        fetch(`${local_api}/users?email=${this.state.email}&password=${this.state.password}`)
            .then(response => response.json())
            .then(data => {
                if(data.length > 0) {
                    localStorage.setItem('token', JSON.stringify(new Date()));
                    window.dispatchEvent(new Event("storage"));
                }
            })
        console.log(this.state.email);
    }

    handleMailChange = (val) => {
        console.log('mail', val);
        this.setState({ email: val });
    }

    handlePassChange = (val) => {
        console.log('pass', val);
        this.setState({ password: val });
    }

    render() {
        return (
            <div className="Login">
                <CInput type="email" func={this.handleMailChange} />
                <CInput type="password" func={this.handlePassChange} />
                <CButton innerText="submit" styling="Submit" action={this.loggingIn} />
            </div>
        );
    }
}

export default Login;
