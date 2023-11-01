import React, {
    useContext,
    useEffect,
    useState
} from 'react';

import './c-switch.scss';
import { AchivifyContext } from '../../MyContext';


const CSwitch = ({ whatToSwitch, valuesToSwitch, sendFromSwitchToParent }) => {
    const [left_value, right_value] = valuesToSwitch;

    const { theme } = useContext(AchivifyContext);
    const [switcherDomElement, setSwitcherDomElement] = useState('');

    useEffect(() => {
        const switcher = document.getElementById('switcher');
        setSwitcherDomElement(switcher);
    }, []);

    useEffect(() => {
        setSwitcherPosition();
    }, [switcherDomElement]);

    const setSwitcherPosition = () => {
        if (switcherDomElement) {
            if (getValueOfWhatToSwitch() === left_value) {
                moveSwitcherLeft()
            } else {
                moveSwitcherRight()
            }
        }
    }

    const getValueOfWhatToSwitch = () => {
        return localStorage.getItem(whatToSwitch);
    }

    const moveSwitcherRight = () => {
        switcherDomElement.setAttribute('checked', 'checked');
    }

    const moveSwitcherLeft = () => {
        switcherDomElement.removeAttribute('checked');
    }

    const changeSwitcherPosition = () => {
        const currentVal = isSwitcherOnTheRight() ? right_value : left_value
        setAndSendSwitchValue(currentVal);
    }

    const isSwitcherOnTheRight = () => {
        return document.getElementById('switcher').checked
    }

    const setAndSendSwitchValue = (val) => {
        sendFromSwitchToParent(val);
        localStorage.setItem(whatToSwitch, val);
    }

    return (
        <label className='CSwitch' theme={theme}>
            <input
                id='switcher'
                type='checkbox'
                onClick={changeSwitcherPosition}
                onChange={changeSwitcherPosition} />
            <span className='slider'></span>
        </label>
    );
};

export default CSwitch;