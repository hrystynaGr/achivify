import React, { Component, useState, useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import { ReactComponent as GearSVG } from './gear.svg'
import { AchivifyContext } from './MyContext';
import Login from './molecules/login/login';
import Dashboard from './organisms/dashboard/dashboard';
import Configs from './organisms/configs/configs';
import CButton from './atoms/c-button/c-button';
import CSwitch from './atoms/c-switch/c-switch';
import SignIn from './molecules/sign-in/sign-in';
import { userLoad, isLoggedIn, logOut } from './helpers/user'
import { pageName, isObjEmpty } from './helpers/shared';

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

  // useEffect(() => {

  // }, [isLoggedIn])

  const grabTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
  };

  const logout = () => {
    logOut();
    setUser({});
    setLoggedIn(false);
  };

  const signin = () => {
    window.location.href = '/signin';
  };

  const login = () => {
    window.location.href = '/login';
  };

  if (!isObjEmpty(user)) {
    return <h4>We can't fetch info about user, but we are working on it</h4>
  } else {
    let button, topGear;
    if (loggedIn) {
      button = <CButton onClick={() => logout()} styling="logout" innerText="logout" />;
      topGear = <GearSVG />;
    } else {
      button = (
        <div style={{ display: 'flex' }}>
          <CButton onClick={() => login()} styling="login" innerText="login" />
          <CButton onClick={() => signin()} styling="signin" innerText="signin" />
        </div>
      );
      topGear = null;
    }

    const contextValues = { user: user, loggedIn: loggedIn, theme: theme, grabTheme: grabTheme };

    return (
      <AchivifyContext.Provider value={contextValues}>
        <div className="App" theme={theme}>
          <div className="topBar">
            <div>
              <CSwitch keyName="theme" values={['light', 'dark']} grabTheme={grabTheme} />
              <a href="/configs">{topGear}</a>
            </div>
            {button}
          </div>
          <header className="App-header">
            <BrowserRouter>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
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
