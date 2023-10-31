import React, { useContext, useEffect, ReactComponent, useState } from 'react';

import './c-pop-up.scss';
import { AchivifyContext } from '../../MyContext';

import { ReactComponent as CloseSVG } from '../../cross.svg'

function CPopUp(props) {
    const { theme } = useContext(AchivifyContext);
    const { status, message, display, callbackClose } = props;
    const [popUpDOM, setPopUpDOM] = useState('');

    useEffect(() => {
        setPopUpDOM(document.querySelector('.CPopUp'))
        if (display && popUpDOM) {
            animatePopUp(popUpDOM, '-100px', '0', 'flex');
        }
        else if (popUpDOM) {
            animatePopUp(popUpDOM, '0', '-100px', 'none');
        }
    }, [display])

    const animatePopUp = (element, start, end, display) => {
        if (display === 'flex') {
            element.style.display = 'flex';
        }
        else {
            setTimeout(() => {
                element.style.display = 'none';
            }, 1000)
        }
        if (element) {
            element.animate([
                {
                    bottom: start,
                },
                {
                    bottom: end,
                },
            ], {
                duration: 1000,
            });
        }
    }
    return (<div className={`CPopUp ${status}`} theme={theme}>
        <CloseSVG className="CloseSVG" onClick={callbackClose} />
        {message}
    </div>
    );
}

export default CPopUp;