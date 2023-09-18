import React, { Component, useState, useContext } from 'react';
import { redirect } from 'react-router'
import './login.scss';

import { AchivifyContext } from '../../MyContext';
import CInput from '../../atoms/c-input/c-input';
import CButton from '../../atoms/c-button/c-button';
import configs from '../../config';

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
        fetch(`${configs.local_api}/users?email=${this.state.email}&password=${this.state.password}`)
            .then(response => response.json())
            .then(data => {
                if(data.length > 0) {
                    localStorage.setItem('token', JSON.stringify(new Date()));
                    const { name } = data[0];
                    this.props.grabName(name)
                    window.dispatchEvent(new Event("storage"));
                }
            })
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
