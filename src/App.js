import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './molecules/login/login';
import Dashboard from './organisms/dashboard/dashboard';
import Configs from './organisms/configs/configs';
import {handleLocalStorageChange} from './services/login-check';

class App extends Component {
  componentDidMount() {
    window.addEventListener('storage', handleLocalStorageChange);
  }

  componentWillUnmount() {
    window.removeEventListener('storage', handleLocalStorageChange);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />}/>
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/configs" element={<Configs />}/>
            </Routes>
          </BrowserRouter>
        </header>
      </div>
    );
  }
}

export default App;
