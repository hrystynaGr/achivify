import React, { useState, useEffect, useContext } from 'react';

import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

import Login from '../../molecules/login/login';
import Dashboard from '../../organisms/dashboard/dashboard'
import Configs from '../../organisms/configs/configs';
import SignIn from '../../molecules/sign-in/sign-in';
import ConfigsTime from '../../organisms/configs-time/configs-time';
import './routes.scss';
import { AchivifyContext } from '../../MyContext';

function CRoutes({loggedIn}) {
  const { theme, user } = useContext(AchivifyContext);


  return (
    <div className="CRoutes" theme={theme}>
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
    </div>
  );
}

export default CRoutes;
