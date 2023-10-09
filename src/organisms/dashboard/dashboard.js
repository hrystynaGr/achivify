import React, { useContext, useEffect, useState } from 'react';
import { AchivifyContext } from '../../MyContext';
import { loadUsersTimeStudied } from '../../helpers/user';
import './dashboard.scss';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function Dashboard(props) {
  const { loggedIn, user, theme } = useContext(AchivifyContext);
  const [usersTimeStudied, setUsersTimeStudied] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadUsersTimeStudied(user);
      setUsersTimeStudied(data);
      console.log('datadatadatadatadata', data)
    }
    fetchData();

  }, [user])

  let textElem;
  if (loggedIn) {
    textElem = <h2>Hello {user.name}, I am Dashboard</h2>;
  } else {
    textElem = <h2>Please log in to see the dashboard</h2>;
  }

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
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

  return (
    <div className="Dashboard" theme={theme}>
      {textElem}
      {console.log('data', usersTimeStudied)}
      <div className='chart-wrap'>
        <Bar options={config} data={data} />
      </div>
    </div>
  );
}

export default Dashboard;
