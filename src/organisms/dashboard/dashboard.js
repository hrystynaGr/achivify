import React, { useContext, useEffect, useState } from 'react';

// eslint-disable-next-line
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

import './dashboard.scss';
import { AchivifyContext } from '../../MyContext';
import { milestonesLoad } from '../../helpers/milestones';
import { loadUsersTimeStudied } from '../../helpers/user';
import { loadUsersMilestones } from '../../helpers/user/milestones';
import {
  parseTimeToMinutes,
  dayFromDate,
  isObjEmpty,
  monthFromDate,
  yearFromDate,
  formattedToday
} from '../../helpers/shared';

import CButton from '../../atoms/c-button/c-button';
import CProgressBar from '../../atoms/c-progressbar/c-progress-bar';

function Dashboard(props) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const year = 2023;

  const { user, theme } = useContext(AchivifyContext);
  const [usersTimeStudied, setUsersTimeStudied] = useState({});
  const [monthDataSet, setMonthDataSet] = useState([]);
  const [month, setMonth] = useState(0);
  const [months, setMonths] = useState([]);
  const [milestones, setMilestones] = useState(0);
  const [juniorScope, setJuniorScope] = useState(0);
  const [middleScope, setMiddleScope] = useState(0);
  const [seniorScope, setSeniorScope] = useState(0);
  const [usersJuniorScope, setUsersJuniorScope] = useState(0);
  const [usersMiddleScope, setUsersMiddleScope] = useState(0);
  const [usersSeniorScope, setUsersSeniorScope] = useState(0);
  const [usersMilestones, setUsersMilestones] = useState(0);
  const [timeInMonth, setTimeInMonth] = useState(0);
  const [timeInMonthTrend, setTimeInMonthTrend] = useState(0);
  const [avgDayStudy, setAvgDayStudy] = useState(0);
  const [usersCleanCodeScope, setUsersCleanCodeScope] = useState(0);
  const [cleanCodeScope, setCleanCodeScope] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadUsersTimeStudied(user);
      setUsersTimeStudied(data);
      const milestns = await milestonesLoad();
      setMilestones(milestns);
      const usersMilestones = await loadUsersMilestones(user.id);
      setUsersMilestones(usersMilestones.milestones)
    }
    fetchData();
  }, [user])

  useEffect(() => {
    setMonthDataSet(
      createMonthlyDataset(monthFromDate(formattedToday()),
        yearFromDate(formattedToday()))
    );
    createMonths();
    setMonth(monthFromDate(formattedToday()))
    // eslint-disable-next-line
  }, [usersTimeStudied]);

  useEffect(() => {
    setMonthDataSet(createMonthlyDataset(month, year))
    // eslint-disable-next-line
  }, [month]);

  useEffect(() => {
    monthStudies();
  }, [monthDataSet])

  useEffect(() => {
    timeTwoMonthTrend();
    avgtimeDay();
  }, [timeInMonth, months, month])

  useEffect(() => {
    const juniorSc = countScope('junior', milestones);
    const middleSc = countScope('middle', milestones);
    const seniorSc = countScope('senior', milestones);
    const cleanCodeSc = countScope('cleanCode', milestones);
    setJuniorScope(juniorSc);
    setMiddleScope(middleSc);
    setSeniorScope(seniorSc);
    setCleanCodeScope(cleanCodeSc);
  }, [milestones])

  useEffect(() => {
    const juniorSc = countScope('junior', usersMilestones);
    const middleSc = countScope('middle', usersMilestones);
    const seniorSc = countScope('senior', usersMilestones);
    const cleanCodeSc = countScope('cleanCode', usersMilestones);
    setUsersJuniorScope(juniorSc);
    setUsersMiddleScope(middleSc);
    setUsersSeniorScope(seniorSc);
    setUsersCleanCodeScope(cleanCodeSc);
  }, [usersMilestones])


  function countScope(type, obj) {
    if (obj) {
      const scope = obj?.find((el) => el[type])
      if (scope) {
        return Object.values(scope[type]).reduce((acc, el) => acc + el.length, 0)
      }
    }
  }
  function createMonth() {
    let count = 0;
    const result = [];
    while (count < 31) {
      result.push(++count);
    }
    return result;
  }

  function createMonths() {
    let times = new Set(usersTimeStudied?.studies?.map((el) => monthFromDate(el.date)));
    setMonths(Array.from(times));
  }

  function monthStudies() {
    let data = 0;
    if (!monthDataSet.every((el) => el === 0)) {
      data = monthDataSet?.reduce((acc, data) => data + acc) / 60
    }
    setTimeInMonth(data);
  }

  function avgtimeDay() {
    const daysStudied = monthDataSet?.filter((el) => Boolean(el)).length;
    const res = timeInMonth / daysStudied;
    setAvgDayStudy(res);
  }

  function timeTwoMonthTrend() {
    let res = 0;
    const prevMonth = months[months.indexOf(month) + 1];
    const thisMonthData = timeInMonth * 60;
    const prevMonthData = createMonthlyDataset(prevMonth, year).reduce((acc, data) => data + acc);
    if (prevMonth) {
      res = (thisMonthData * 100) / prevMonthData;
    }
    setTimeInMonthTrend(res);
  }

  function createMonthlyDataset(month, year) {
    let result = [];
    let times = usersTimeStudied?.studies;
    let res = 0;
    let found = false;
    for (let day in createMonth()) {
      for (let entry in times) {
        found = false;
        if (Number(createMonth()[day]) === dayFromDate(times[entry]?.date)
          && month === monthFromDate(times[entry]?.date)
          && year === yearFromDate(times[entry]?.date)) {
          res = parseTimeToMinutes(times[entry]?.hoursStudied);
          result.push(res);
          found = true;
          break;
        }
      }
      if (!found) {
        result.push(0);
      };
    }
    return result;
  }

  const labels = createMonth();
  const dataset = monthDataSet;
  const data = {
    labels: labels,
    datasets: [{
      label: 'Time studied in a day in minutes',
      data: dataset,
      backgroundColor: [
        'rgba(238,108,77,0.2)',
      ],
      borderColor: [
        'rgba(238,108,77)',
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      responsive: true
    },
  };

  if (isObjEmpty(usersTimeStudied)) {
    return null;
  } else {
    return (
      <div className="Dashboard" theme={theme}>
        <h3>{'Time Studied:'}</h3>
        <div className='chart-wrap'>
          <Bar options={config} data={data} />
        </div>
        <div className="month">
          {months.sort(function (a, b) { return b - a })?.map((mth) =>
            <CButton
              type={month === mth ? 'accent' : 'outlined'}
              innerText={monthNames[mth - 1]}
              key={mth}
              onClick={() => setMonth(mth)} />
          )}
        </div>
        <h3 className="progress-title">Your trends:</h3>
        <div className='trends'>
          <h4>Time Studied in a moonth:</h4>
          <div>{`${timeInMonth.toFixed(0)}h`}</div>
          <h4>This month trend in comparison to previous:</h4>
          <div>{`${timeInMonthTrend.toFixed(0)}%`}</div>
          <h4>Average time studied in a day:</h4>
          <div>{`${avgDayStudy ? avgDayStudy.toFixed(1) : 0}h`}</div>
        </div>
        <h3 className="progress-title">{'Your progress on 300 JS questions:'}</h3>
        <div className="progress-wrap">
          <h4>Junior</h4>
          <CProgressBar type={'junior'} progress={usersJuniorScope} scope={juniorScope} />
          <h4>Middle</h4>
          <CProgressBar type={'middle'} progress={usersMiddleScope} scope={middleScope} />
          <h4>Senior</h4>
          <CProgressBar type={'senior'} progress={usersSeniorScope} scope={seniorScope} />
        </div >
        <h3 className="progress-title">{'Your progress on Clean Code Book:'}</h3>
        <div className="progress-wrap">
          <CProgressBar type={'clean-code'} progress={usersCleanCodeScope} scope={cleanCodeScope} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
