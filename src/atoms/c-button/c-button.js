import React, { Component } from 'react';
import './c-button.scss';

class CButton extends Component {
    render() {
        return (
            <div className="CButton">
                <button
                    type="button"
                    className={`button ${this.props.styling}`}
                    onClick={this.props.action}
                >
                    {this.props.innerText}
                </button>
            </div>
        );
    }
}

export default CButton;
