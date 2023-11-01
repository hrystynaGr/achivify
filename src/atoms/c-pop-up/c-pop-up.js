import React, {
    useContext,
    useEffect,
    ReactComponent,
    useState
} from 'react';

import './c-pop-up.scss';
import { AchivifyContext } from '../../MyContext';

import { ReactComponent as CloseSVG } from '../../cross.svg'

function CPopUp({ status, message, shouldDisplay, closeFunction }) {
    const { theme } = useContext(AchivifyContext);
    const [popupDomElement, setPopupDomElement] = useState('');

    useEffect(() => {
        const popUp = document.querySelector('.CPopUp');
        setPopupDomElement(popUp);
        if (popupDomElement) {
            invokeApropriateAnimation();
        }
    }, [shouldDisplay])

    const invokeApropriateAnimation = () => {
        if (shouldDisplay) {
            popupAppear();
        }
        else {
            popupFade();
        }
    }

    const popupFade = () => {
        animatePopup('0', '-100px');
        setTimeout(() => {
            popupDomElement.style.display = 'none';
        }, 1000)
    }

    const popupAppear = () => {
        popupDomElement.style.display = 'flex';
        animatePopup('-100px', '0');
    }

    const animatePopup = (start, end) => {
        popupDomElement.animate([
            { bottom: start },
            { bottom: end },
        ], {
            duration: 1000,
        });
    }

    return (<div className={`CPopUp ${status}`} theme={theme}>
        <CloseSVG className='CloseSVG' onClick={closeFunction} />
        {message}
    </div>
    );
}

export default CPopUp;