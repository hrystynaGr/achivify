import React, { Component } from 'react';
import logo from './cogwheel.png';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './molecules/login/login';
import Dashboard from './organisms/dashboard/dashboard';
import Configs from './organisms/configs/configs';

import { UserNameContext } from './MyContext';
import CButton from './atoms/c-button/c-button';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: localStorage.getItem("userName") || '',
    };
  }

  componentDidMount() {
    window.addEventListener('storage', () => {
      window.location.href = '/dashboard';
    });
  }

  grabName = (name) => {
    this.setState({ userName: name });
    localStorage.setItem("userName", name);
  }

  logout = () => {
    this.setState({ userName: '' });
    localStorage.removeItem('userName');
  }

  render() {
    let name = this.state.userName
    return (
      <UserNameContext.Provider value={name}>
        <div className="App">
          <CButton onClick={this.logout} styling="logout" innerText="Logout"/>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login grabName={this.grabName} />} />
                <Route path="/dashboard" element={<Dashboard name={name} />} />
                <Route path="/configs" element={<Configs />} />
              </Routes>
            </BrowserRouter>
          </header>
        </div>
      </UserNameContext.Provider>
    );
  }
}

export default App;
