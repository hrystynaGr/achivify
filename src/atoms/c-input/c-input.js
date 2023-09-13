import React, { Component } from 'react';
import './c-input.scss';

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
        console.log('value is:', newValue);

        // Pass the updated value to the parent component's function
        this.props.func(newValue);
    };

    render() {
        return (
            <div className="Input">
                <label>{this.props.type}</label>
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

export default CInput;
