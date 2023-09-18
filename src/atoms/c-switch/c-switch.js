import React, { Component } from 'react';
import { AchivifyContext } from '../../MyContext';
import './c-switch.scss';

class CSwitch extends Component {

    constructor(props) {
        super(props);
        const [value_one, value_two] = this.props.values
        this.state = {
          key: this.props.keyName || '',
          value_one: value_one || '',
          value_two: value_two || '',
          theme: this.props.theme || '',
        };
      }

    componentDidMount = () => {
        this.checkbox = document.getElementById('switcher');
        if(this.state.theme === this.state.value_one) {
            this.checkbox.setAttribute('checked', true)
        }
        else {
            this.checkbox.removeAttribute('checked')
        }
    }

    checkToggle = () => {
        if (this.checkbox.checked) {
            this.props.grabTheme(this.state.value_one)
        } else {
            this.props.grabTheme(this.state.value_two)
        }
    }

    isChecked = () => {
        if (localStorage.getItem(this.state.key) === this.state.value_one) {
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