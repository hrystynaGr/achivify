import React, { useContext } from 'react';

import './c-button.scss';
import { AchivifyContext } from '../../MyContext';

function CButton(props) {
    const { theme } = useContext(AchivifyContext)
    const { styling, onClick, innerText } = props;

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
