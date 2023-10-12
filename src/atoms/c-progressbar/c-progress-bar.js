import React, { useContext, useEffect } from 'react';

import { AchivifyContext } from '../../MyContext';
import './c-progress-bar.scss';

function CProgressBar(props) {
    const { theme } = useContext(AchivifyContext)
    const { doneFromScope, allScope } = props;

    useEffect(() => {
        calculateDone();
        animate();
    })

    function calculatePercentDone() {
        const percent = ((doneFromScope * 100) / allScope).toFixed(0);
        return `${percent}%`
    }

    function calculateDone() {
        document.querySelector('.doneLine').style.width = `${(doneFromScope * 100) / allScope}%`
    }

    function animate() {
        document.querySelector('.doneLine').animate([
            { width: 0 },
            { transform: calculateDone() }
        ], {
            duration: 1000,
        });
    }

    return (
        <div className={`CProgressbar`} theme={theme}>
            <div className="wholeLine">
                <div className="doneLine"></div>
                <div className="percent">{calculatePercentDone()}</div>
            </div>
        </div>
    );
}

export default CProgressBar;