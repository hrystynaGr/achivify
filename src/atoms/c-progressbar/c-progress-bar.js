import React, { useContext, useEffect } from 'react';

import './c-progress-bar.scss';
import { AchivifyContext } from '../../MyContext';

function CProgressBar({ type, scope, progress }) {
    const { theme } = useContext(AchivifyContext)

    useEffect(() => {
        setProgressWidth();
        animate();
        // eslint-disable-next-line
    }, [scope, progress])

    const setProgressWidth = () => {
        const progressLine = document.querySelector(`.done-line_${type}`);
        progressLine.style.width = formatedProgress()
    }

    const progressInPercents = () => {
        return ((progress * 100) / scope).toFixed(0);
    }

    const animate = () => {
        document.querySelector(`.done-line_${type}`).animate([
            { width: 0 },
            { width: formatedProgress() },
        ], {
            duration: 2000,
        });
    }

    const formatedProgress = () => {
        return `${progressInPercents()}%`
    }

    return (
        <div className={`CProgressBar ${type}`} theme={theme}>
            <div className='whole-line'>
                <div className={`done-line done-line_${type}`}></div>
                <div className='percent'>{formatedProgress()}</div>
            </div>
        </div>
    );
}

export default CProgressBar;
