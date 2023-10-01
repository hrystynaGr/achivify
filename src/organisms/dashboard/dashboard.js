import React, { useContext } from 'react';
import { AchivifyContext } from '../../MyContext';
import './dashboard.scss';

function Dashboard() {
  const { loggedIn, user, theme } = useContext(AchivifyContext);

  let textElem;
  if (loggedIn) {
    textElem = <h2>Hello {user.name}, I am Dashboard</h2>;
  } else {
    textElem = <h2>Please log in to see the dashboard</h2>;
  }

  return (
    <div className="Dashboard" theme={theme}>
      {textElem}
    </div>
  );
}

export default Dashboard;
