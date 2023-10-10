import React, { useContext, useEffect, useState } from 'react';
import { AchivifyContext } from '../../MyContext';
import { loadUsersTimeStudied } from '../../helpers/user';
import { parseTimeToMinutes, dayFromDate, isObjEmpty } from '../../helpers/shared';
import './dashboard.scss';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function Dashboard(props) {
  const { loggedIn, user, theme } = useContext(AchivifyContext);
  const [usersTimeStudied, setUsersTimeStudied] = useState({});
  const [monthDataSet, setMonthDataSet] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadUsersTimeStudied(user);
      setUsersTimeStudied(data);
    }
    fetchData();
  }, [user])

  useEffect(() => {
    setMonthDataSet(createMonthlyDataset());
  }, [usersTimeStudied]);

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

  function createMonthlyDataset() {
    let result = [];
    let times = usersTimeStudied?.studies
    let res = 0;
    let found = false;
    for (let day in createMonth()) {
      for (let entry in times) {
        if (Number(day) === dayFromDate(times[entry]?.date)) {
          res = parseTimeToMinutes(times[entry]?.hoursStudied);
          result.push(res);
          found = true;
          break;
        }
      }
      if (!found) result.push(0);
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
      </div>
    );
  }
}

export default Dashboard;
