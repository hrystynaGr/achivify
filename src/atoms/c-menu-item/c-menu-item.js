import React, { useContext } from 'react';

import './c-menu-item.scss';
import { AchivifyContext } from '../../MyContext';

function CMenuItem(props) {
    const { theme } = useContext(AchivifyContext);
    const { innerText, link } = props;

    function isActive() {
        return link === window.location.pathname
    }

    return (
        <div className={`CMenuItem ${isActive() ? 'active' : ''}`} theme={theme} >
            <a href={link}>{innerText}</a>
        </div>
    );

}

export default CMenuItem;
