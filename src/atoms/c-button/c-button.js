import React, { Component } from 'react';
import './c-button.scss';

class CButton extends Component {
    render() {
        return (
            <div className={`CButton ${this.props.styling}`}>
                <button
                    type="button"
                    className={`button ${this.props.styling + '-inner'}`}
                    onClick={this.props.onClick}
                >
                    {this.props.innerText}
                </button>
            </div>
        );
    }
}

export default CButton;
