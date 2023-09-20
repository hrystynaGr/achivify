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
        const newValue = event.target.value;
        this.setState({ message: newValue });
        // Pass the updated value to the parent component's function
        this.props.func(newValue);
    };

    render() {
        return (
            <div className="CInput">
                <label className={`label ${this.props.type}`} theme={this.context.theme}>{this.props.label || this.props.type}</label>
                <input
                    type={this.props.type}
                    id={this.props.type}
                    name={this.props.type}
                    value={this.state.message}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

CInput.contextType = AchivifyContext;

export default CInput;
