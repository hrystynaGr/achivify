import React, { useContext, useState } from 'react';
import './c-input.scss';
import { AchivifyContext } from '../../MyContext';

function CInput(props) {
    const { theme } = useContext(AchivifyContext);
    const { label, type, id, func } = props;
    const [messege, setMessege] = useState('');

    const handleChange = (event) => {
        if (type !== 'checkbox') {
            const newValue = event.target.value;
            setMessege(newValue);
            // Pass the updated value to the parent component's function
            func(newValue);
        }
    }

    const handleClick = (event) => {
        if (type === 'checkbox') {
            // Pass the updated value to the parent component's function
            func(event)
        }
    }

    return (
        <div className="CInput">
            <label className={`label ${type}-label`} theme={theme}>{label || type}</label>
            <input
                type={type}
                id={id}
                name={type}
                value={messege}
                onChange={handleChange}
                className={type}
                onClick={handleClick}
            />
        </div>
    );

}

export default CInput;
