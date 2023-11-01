import React, { useContext } from 'react';

import './c-button.scss';
import { AchivifyContext } from '../../MyContext';

function CButton({ type, onClick, innerText }) {
    const { theme } = useContext(AchivifyContext)

    return (
        <div className={`CButton ${type}`} theme={theme}>
            <button
                type='button'
                className={`button ${type + '-inner'}`}
                onClick={onClick}
            >
                {innerText}
            </button>
        </div>
    );
}

export default CButton;
