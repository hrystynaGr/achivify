import React, { useContext, useEffect } from 'react';

import './c-progress-bar.scss';
import { AchivifyContext } from '../../MyContext';

function CProgressBar(props) {
    const { theme } = useContext(AchivifyContext)
    const { doneFromScope, allScope, lvl } = props;

    useEffect(() => {
        calculateDone();
        animate();
        // eslint-disable-next-line
    }, [doneFromScope, allScope])

    function calculatePercentDone() {
        const percent = ((doneFromScope * 100) / allScope).toFixed(0);
        return percent;
    }

    function calculateDone() {
        const percent = calculatePercentDone();
        document.querySelector(`.done-line_${lvl}`).style.width = `${percent}%`
    }

    function animate() {
        document.querySelector(`.done-line_${lvl}`).animate([
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
        <div className={`CProgressbar ${lvl}`} theme={theme}>
            <div className="whole-line">
                <div className={`done-line_${lvl} done-line`}></div>
                <div className="percent">{`${calculatePercentDone()}%`}</div>
            </div>
        </div>
    );
}

export default CProgressBar;
