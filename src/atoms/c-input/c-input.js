import React, { Component, useContext, useState } from 'react';
import './c-input.scss';
import { AchivifyContext } from '../../MyContext';

function CInput(props) {
    const { theme, user } = useContext(AchivifyContext);
    const [messege, setMessege] = useState('');

    const handleChange = (event) => {
        if (props.type !== 'checkbox') {
            const newValue = event.target.value;
            setMessege(newValue);
            // Pass the updated value to the parent component's function
            props.func(newValue);
        }
    }

    const handleClick = (event) => {
        if (props.type === 'checkbox') {
            // Pass the updated value to the parent component's function
            props.func(event)
        }
    }

    return (
        <div className="CInput">
            <label className={`label ${props.type}-label`} theme={theme}>{props.label || props.type}</label>
            <input
                type={props.type}
                id={props.id}
                name={props.type}
                value={messege}
                onChange={handleChange}
                className={props.type}
                onClick={handleClick}
            />
        </div>
    );

}

export default CInput;
