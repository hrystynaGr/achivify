import React, { useContext, useEffect, useState } from 'react';
import { AchivifyContext } from '../../MyContext';
import { loadUsersTimeStudied } from '../../helpers/user';
import { parseTimeToMinutes, dayFromDate, isObjEmpty, monthFromDate, yearFromDate, formattedToday } from '../../helpers/shared';
import './dashboard.scss';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import CButton from '../../atoms/c-button/c-button';

function Dashboard(props) {
  const { loggedIn, user, theme } = useContext(AchivifyContext);
  const [usersTimeStudied, setUsersTimeStudied] = useState({});
  const [monthDataSet, setMonthDataSet] = useState([]);
  const [month, setMonth] = useState(0);
  const [months, setMonths] = useState([]);
  const [year, setYear] = useState(2023);
  const [monthNames, setMonthNames] = useState([
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ])

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadUsersTimeStudied(user);
      setUsersTimeStudied(data);
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
  }, [usersTimeStudied]);

  useEffect(() => {
    setMonthDataSet(createMonthlyDataset(month, year))
  }, [month]);

  let textElem;
  if (loggedIn) {
    textElem = <h2>Hello {user.name}, I am Dashboard</h2>;
  } else {
    textElem = <h2>Please log in to see the dashboard</h2>;
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
      label: 'Time studied in a month',
      data: dataset,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
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
          beginAtZero: true
        }
      },
      responsive: true
    },
  };

  if (isObjEmpty(usersTimeStudied)) {
    return null;
  } else {
    return (
      <div className="Dashboard" theme={theme}>
        {textElem}
        <div className='chart-wrap'>
          <Bar options={config} data={data} />
        </div>
        <div className="month">
          {months?.map((mth) =>
            <CButton styling="logout" innerText={monthNames[Number(mth)]} key={mth} onClick={() => setMonth(mth)} />
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
