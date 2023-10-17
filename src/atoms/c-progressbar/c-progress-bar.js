import React, { useContext, useEffect } from 'react';

import { AchivifyContext } from '../../MyContext';
import './c-progress-bar.scss';

function CProgressBar(props) {
    const { theme } = useContext(AchivifyContext)
    const { doneFromScope, allScope } = props;

    useEffect(() => {
        calculateDone();
        animate();
        // eslint-disable-next-line
    }, [doneFromScope, allScope])

    function calculatePercentDone() {
        const percent = ((doneFromScope * 100) / allScope).toFixed(0);
        return `${percent}%`
    }

    function calculateDone() {
        const percent = ((doneFromScope * 100) / allScope).toFixed(0);
        document.querySelector('.doneLine').style.width = `${percent}%`
        return percent;
    }

    function animate() {
        document.querySelector('.doneLine').animate([
            {
                width: 0,
            },
            {
                width: calculateDone(),
            },
        ], {
            duration: 2000,
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
