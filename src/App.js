import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

import './App.scss';
import { AchivifyContext } from './MyContext';
import {
  userLoad,
  logOut
} from './helpers/user'
import { isLoggedIn } from './helpers/user/log-in'
import { isObjEmpty } from './helpers/shared';

import Login from './molecules/login/login';
import Dashboard from './organisms/dashboard/dashboard';
import Configs from './organisms/configs/configs';
import CButton from './atoms/c-button/c-button';
import CSwitch from './atoms/c-switch/c-switch';
import SignIn from './molecules/sign-in/sign-in';
import ConfigsTime from './organisms/configs-time/configs-time';
import CMenuItem from './atoms/c-menu-item/c-menu-item';
import { ReactComponent as BurgerMenuSVG } from '../src/burger-menu.svg'

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [mobileMenuState, setMobileMenuState] = useState('closed');

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

  const logout = () => {
    logOut();
    setUser({});
    setLoggedIn(false);
    loginRedirect();
  };

  const signinRedirect = () => {
    window.location.href = '/signin';
  };

  const loginRedirect = () => {
    window.location.href = '/login';
  };

  const changeMobileMenuState = () => {
    console.log('changeMobileMenuState', mobileMenuState)
    if (mobileMenuState === 'closed') {
      setMobileMenuState('open');
    }
    else {
      setMobileMenuState('closed');
    }
  }

  if (isObjEmpty(user)) {
    return null;
  } else {
    let button, configs, time, dashboard;
    if (loggedIn) {
      button = <CButton onClick={() => logout()} type="outlined" innerText="logout" />;
      configs = 'Configs';
      time = 'Time';
      dashboard = 'Dashboard';
    } else {
      button = (
        <div style={{ display: 'flex' }}>
          <CButton onClick={() => loginRedirect()} type="accent" innerText="login" />
          <CButton onClick={() => signinRedirect()} type="outlined" innerText="signin" />
        </div>
      );
      configs = null;
      time = null;
      dashboard = null;
    }
    const contextValues = { user: user, loggedIn: loggedIn, theme: theme };
    return (
      <AchivifyContext.Provider value={contextValues}>
        <div className="App" theme={theme}>
          <header className="header">
            <div className='switch-and-burger'>
              <CSwitch
                whatToSwitch="theme"
                valuesToSwitch={['dark', 'light']}
                sendFromSwitchToParent={saveTheme}
              />
              <BurgerMenuSVG
                className={`burger ${(dashboard && configs && time) ? 'visible' : 'not-visible'}`}
                onClick={() => changeMobileMenuState()}
              />
            </div>
            <div className={`menu ${(dashboard && configs && time) ? 'visible' : 'not-visible'}`}>
              <CMenuItem innerText={dashboard} link={`/dashboard`} />
              <CMenuItem innerText={configs} link={`/configs`} />
              <CMenuItem innerText={time} link={`/time`} />
            </div>
            <div className='buttons'>
              {button}
            </div>
          </header>
          <div className={`mobile-menu ${mobileMenuState}`}>
            <CMenuItem innerText={dashboard} link={`/dashboard`} />
            <CMenuItem innerText={configs} link={`/configs`} />
            <CMenuItem innerText={time} link={`/time`} />
          </div>
          <div className='main-content'>
            <BrowserRouter>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/time" element={<ConfigsTime />} />
                <Route path="/configs" element={<Configs />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/" element={loggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </div>
          <footer>
            <div>{'Year 2025'}</div>
            <div>{'(c) Achivify app!'}</div>
          </footer>
        </div>
      </AchivifyContext.Provider>
    );
  }
}

export default App;
