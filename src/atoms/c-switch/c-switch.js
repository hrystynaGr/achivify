import React, { useEffect, useContext } from 'react';
import { AchivifyContext } from '../../MyContext';
import './c-switch.scss';

const CSwitch = (props) => {
    const { theme } = useContext(AchivifyContext)
    const { values, grabTheme, keyName } = props;

    useEffect(() => {
        const checkbox = document.getElementById('switcher');
        if (theme === values[0]) {
            checkbox.setAttribute('checked', 'checked');
        } else {
            checkbox.removeAttribute('checked');
        }
    }, [theme]);

    const checkToggle = () => {
        const [value_one, value_two] = values;
        if (document.getElementById('switcher').checked) {
            grabTheme(value_one);
        } else {
            grabTheme(value_two);
        }
    };

    useEffect(() => {
        const checkbox = document.getElementById('switcher');
        if (localStorage.getItem(keyName) === values[0]) {
            checkbox.setAttribute('checked', true);
        } else {
            checkbox.removeAttribute('checked');
        }
    }, [keyName, values]);

    return (
        <label className="switch" theme={theme}>
            <input id="switcher" type="checkbox" onClick={checkToggle} onChange={checkToggle} />
            <span className="slider round"></span>
        </label>
    );
};

export default CSwitch;