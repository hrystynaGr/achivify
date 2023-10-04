import React, { Component, useState, useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import { ReactComponent as StopwatchSVG } from './stopwatch.svg'
import { ReactComponent as GearSVG } from './gear.svg'
import { AchivifyContext } from './MyContext';
import Login from './molecules/login/login';
import Dashboard from './organisms/dashboard/dashboard';
import Configs from './organisms/configs/configs';
import CButton from './atoms/c-button/c-button';
import CSwitch from './atoms/c-switch/c-switch';
import SignIn from './molecules/sign-in/sign-in';
import ConfigsTime from './organisms/configs-time/configs-time';
import { userLoad, isLoggedIn, logOut } from './helpers/user'
import { isObjEmpty } from './helpers/shared';

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
      window.location.href = '/dashboard';
    };
    window.addEventListener('newUser', handleStorageChange);

    return () => {
      window.removeEventListener('newUser', handleStorageChange);
    };
  }, [isLoggedIn]);

  const grabTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
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

  if (!isObjEmpty(user)) {
    return null;
  } else {
    let button, topGear, stopWatch;
    if (loggedIn) {
      button = <CButton onClick={() => logout()} styling="logout" innerText="logout" />;
      topGear = <GearSVG />;
      stopWatch = <StopwatchSVG/>;
    } else {
      button = (
        <div style={{ display: 'flex' }}>
          <CButton onClick={() => loginRedirect()} styling="login" innerText="login" />
          <CButton onClick={() => signinRedirect()} styling="signin" innerText="signin" />
        </div>
      );
      topGear = null;
      stopWatch = null;
    }
    const contextValues = { user: user, loggedIn: loggedIn, theme: theme, grabTheme: grabTheme };
    return (
      <AchivifyContext.Provider value={contextValues}>
        <div className="App" theme={theme}>
          <div className="topBar">
            <div>
              <CSwitch keyName="theme" values={['light', 'dark']} grabTheme={grabTheme} />
              <a href="/configs">{topGear}</a>
              <a href="/configs/time">{stopWatch}</a>
            </div>
            {button}
          </div>
          <header className="App-header">
            <BrowserRouter>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/configs/time" element={<ConfigsTime />} />
                <Route path="/configs" element={<Configs />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/" element={loggedIn ? <Navigate to="/dashboard"/> : <Navigate to="/login"/>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </header>
        </div>
      </AchivifyContext.Provider>
    );
  }
}

export default App;
