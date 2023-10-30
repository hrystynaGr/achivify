import React, { useContext, useEffect, useState } from 'react';
import './configs-time.scss';
import { AchivifyContext } from '../../MyContext';
import CInput from '../../atoms/c-input/c-input';
import CButton from '../../atoms/c-button/c-button';
import CPopUp from '../../atoms/c-pop-up/c-pop-up';
import { loadUsersTimeStudied, updateEntryForUserInTimeStudied } from '../../helpers/user'
import { formattedToday } from '../../helpers/shared'
import configs from '../../config';

function ConfigsTime() {
    const successMsg = 'You have succesfully create a new Entry for the time Studied!';
    const { user, theme } = useContext(AchivifyContext);
    const [timeStudied, setTimeStudied] = useState([]);
    const [timeToday, setTimeToday] = useState('');
    const [timeStudiedId, setTimeStudiedId] = useState(0);
    const [fetchState, setFetchState] = useState('info');
    const [displayPopUp, setDisplayPopUp] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState('');

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
                studies: addNewTimeEntry(today),
                entryId: timeStudiedId
            }
            updateEntryForUserInTimeStudied(data);
            changePopUpSatate(true, 'success', successMsg)
        }
        catch (error) {
            changePopUpSatate(true, 'warning', error)
            console.error("Failed PUT to timeStudied", error);
        }
    }

    const addNewTimeEntry = (today) => {
        let indexOfExistingEntry = timeStudied.findIndex((el) => el.date === today.date);
        if(indexOfExistingEntry > 0) {
            timeStudied[indexOfExistingEntry].hoursStudied = today.hoursStudied;
            return timeStudied;
        }
        else {
            return [...timeStudied, today]
        }
    }

    const changePopUpSatate = (state, status, messege) => {
        setPopUpMessage(messege);
        setFetchState(status);
        setDisplayPopUp(state);
        setTimeout(() => {
            setDisplayPopUp(false);
        }, 5000)
    }

    const handleClosePopUp = () => {
        setDisplayPopUp(false);
    }

    return (
        <div className="ConfigsTime" theme={theme}>
            <h2 className='confis-time-h2'>Hey {user.name}! How long did you study today &#128171; sunshine &#128171;?</h2>
            <p>Go on! Enter time in hours and minutes in hh:mm format and see your progress on dashboard!</p>
            <CInput label='Time worked: ' type='time' id='time' func={handleTimeEnter} />
            <CButton onClick={submitTime} innerText='Submit' />
            <CPopUp status={fetchState} message={popUpMessage} display={displayPopUp} callbackClose={handleClosePopUp} />
        </div>
    )
}

export default ConfigsTime;