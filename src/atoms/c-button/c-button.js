import React, { Component } from 'react';

import { AchivifyContext } from '../../MyContext';
import './c-button.scss';

class CButton extends Component {
    render() {
        return (
            <div className={`CButton ${this.props.styling}`} theme={this.context.theme}>
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

CButton.contextType = AchivifyContext;

export default CButton;
