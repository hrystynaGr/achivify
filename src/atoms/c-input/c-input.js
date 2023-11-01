import React, { useContext, useState } from 'react';

import './c-input.scss';
import { AchivifyContext } from '../../MyContext';

function CInput({ label, type, id, sendFromInputToParent }) {
    const { theme } = useContext(AchivifyContext);
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        if (type !== 'checkbox') {
            const currentValue = event.target.value;
            setInputValue(currentValue);
            sendFromInputToParent(currentValue);
        }
    }

    const handleClick = (event) => {
        if (type === 'checkbox') {
            sendFromInputToParent(event);
        }
    }

    return (
        <div className='CInput'>
            <label
                className={`label ${type}-label`}
                theme={theme}>{label || type}</label>
            <input
                id={id}
                className={type}
                type={type}
                value={inputValue}
                onChange={handleChange}
                onClick={handleClick}
            />
        </div>
    );

}

export default CInput;
