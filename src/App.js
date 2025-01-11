import React, { useState, useEffect } from 'react';

import './App.scss';
import { AchivifyContext } from './MyContext';
import {
  userLoad,
} from './helpers/user'
import { isLoggedIn } from './helpers/user/log-in'
import { isObjEmpty } from './helpers/shared';

import Header from './molecules/header/header';
import CRoutes from './organisms/routes/routes';
import Footer from './molecules/footer/footer';

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const fetchData = async () => {
      const response = await userLoad();
      const response2 = await isLoggedIn();
      setUser(response);
      setLoggedIn(response2);
    };
    fetchData();
    const handleStorageChange = () => {
      console.log("Event catched")
      window.location.href = '/dashboard';
    };
    window.addEventListener('logIn', handleStorageChange);

    return () => {
      window.removeEventListener('logIn', handleStorageChange);
    };
    // eslint-disable-next-line
  }, []);

  const saveTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    // localStorage.setItem('theme', selectedTheme);
  };

  if (isObjEmpty(user)) {
    return null;
  } else {
    const contextValues = { user: user, loggedIn: loggedIn, theme: theme };
    return (
      <AchivifyContext.Provider value={contextValues}>
        <div className="App" theme={theme}>
          <Header saveTheme={saveTheme} loggedIn={loggedIn}/>
          <CRoutes loggedIn={loggedIn} />
          <Footer/>
        </div>
      </AchivifyContext.Provider>
    );
  }
}

export default App;
