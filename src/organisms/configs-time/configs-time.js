import React, { useContext, useEffect, useState } from 'react';
import './configs-time.scss';
import { AchivifyContext } from '../../MyContext';
import CInput from '../../atoms/c-input/c-input';
import CButton from '../../atoms/c-button/c-button';
import { loadUsersTimeStudied } from '../../helpers/user'
import { formattedToday } from '../../helpers/shared'
import configs from '../../config';

function ConfigsTime() {
    const { user, theme } = useContext(AchivifyContext);
    const [timeStudied, setTimeStudied] = useState([]);
    const [timeToday, setTimeToday] = useState('');
    const [timeStudiedId, setTimeStudiedId] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await loadUsersTimeStudied(user);
            setTimeStudied(response?.studies);
            setTimeStudiedId(response?.id);
        }
        fetchData();
        // eslint-disable-next-line
    }, [])

    const handleTimeEnter = async (currStudy) => {
        setTimeToday(currStudy)
    }

    const submitTime = async () => {
        const date = formattedToday();
        const today = {
            date: date,
            hoursStudied: timeToday
        }
        try {
            const data = {
                userid: user.id,
                studies: [...timeStudied, today]
            }
            const response = await fetch(`${configs.local_api}/timeStudied/${timeStudiedId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else {
                console.info("Success PUT to timeStudied")
            }
        }
        catch (error) {
            console.error("Failed PUT to timeStudied", error);
        }
    }

    return (
        <div className="ConfigsTime" theme={theme}>
            <h2 className='confis-time-h2'>Hey {user.name}! How long did you study today &#128171; sunshine &#128171;?</h2>
            <p>Go on! Enter time in hours and minutes in hh:mm format and see your progress on dashboard!</p>
            <CInput label='Time worked: ' type='time' id='time' func={handleTimeEnter} />
            <CButton onClick={submitTime} innerText='Submit' />
        </div>
    )
}

export default ConfigsTime;