import React, { Component } from 'react';
import { AchivifyContext } from '../../MyContext';
import './c-switch.scss';

class CSwitch extends Component {

    componentDidMount = () => {
        this.checkbox = document.getElementById('switcher');
        if(this.context.theme === this.props.values[0]) {
            this.checkbox.setAttribute('checked', true)
        }
        else {
            this.checkbox.removeAttribute('checked')
        }
    }

    checkToggle = () => {
        const [value_one, value_two] = this.props.values
        if (this.checkbox.checked) {
            this.props.grabTheme(value_one)
        } else {
            this.props.grabTheme(value_two)
        }
    }

    isChecked = () => {
        if (localStorage.getItem(this.props.keyName) === this.props.values[0]) {
            this.checkbox.setAttribute('checked', true)
        } else {
            this.checkbox.removeAttribute('checked')
        }
    }

    render() {
        return (
            <label className="switch" theme={this.context.theme}>
                <input id='switcher' type="checkbox" onClick={this.checkToggle} onChange={this.isChecked}></input>
                <span className="slider round"></span>
            </label>
        );
    }
}

CSwitch.contextType = AchivifyContext;

export default CSwitch;