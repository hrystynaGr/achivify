import React, { useContext } from 'react';

import './c-menu-item.scss';
import { AchivifyContext } from '../../MyContext';

function CMenuItem({ innerText, link }) {
    const { theme } = useContext(AchivifyContext);

    const isActive = () => {
        return link === window.location.pathname
    }

    const formClassName = () => {
        return isActive() ? 'active' : ''
    }

    return (
        <div
            className={`CMenuItem ${formClassName()}`}
            theme={theme} >
            <a href={link}>{innerText}</a>
        </div>
    );

}

export default CMenuItem;
