import React, { Component, useContext } from 'react';

import { AchivifyContext } from '../../MyContext';
import './c-button.scss';

function CButton(props) {
    const { theme } = useContext(AchivifyContext)
    return (
        <div className={`CButton ${props.styling}`} theme={theme}>
            <button
                type="button"
                className={`button ${props.styling + '-inner'}`}
                onClick={props.onClick}
            >
                {props.innerText}
            </button>
        </div>
    );
}

export default CButton;
