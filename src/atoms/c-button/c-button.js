import React, { useContext } from 'react';

import './c-button.scss';
import { AchivifyContext } from '../../MyContext';

function CButton({ styling, onClick, innerText }) {
    const { theme } = useContext(AchivifyContext)

    return (
        <div className={`CButton ${styling}`} theme={theme}>
            <button
                type="button"
                className={`button ${styling + '-inner'}`}
                onClick={onClick}
            >
                {innerText}
            </button>
        </div>
    );
}

export default CButton;
