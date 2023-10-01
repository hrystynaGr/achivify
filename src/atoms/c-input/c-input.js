import React, { Component } from 'react';
import './c-input.scss';
import { AchivifyContext } from '../../MyContext';

class CInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };
    }

    handleChange = (event) => {
        if (this.props.type !== 'checkbox') {
            const newValue = event.target.value;
            this.setState({ message: newValue });
            // Pass the updated value to the parent component's function
            this.props.func(newValue);
        }
    }

    handleClick = (event) => {
        if (this.props.type === 'checkbox') {
            // Pass the updated value to the parent component's function
            this.props.func(event)
        }
    }

    render() {
        return (
            <div className="CInput">
                <label className={`label ${this.props.type}-label`} theme={this.context.theme}>{this.props.label || this.props.type}</label>
                <input
                    type={this.props.type}
                    id={this.props.id}
                    name={this.props.type}
                    value={this.state.message}
                    onChange={this.handleChange}
                    className={this.props.type}
                    onClick={this.handleClick}
                />
            </div>
        );
    }
}

CInput.contextType = AchivifyContext;

export default CInput;
