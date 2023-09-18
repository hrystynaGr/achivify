import React, { Component } from 'react';
import logo from './cogwheel.png';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AchivifyContext } from './MyContext';
import Login from './molecules/login/login';
import Dashboard from './organisms/dashboard/dashboard';
import Configs from './organisms/configs/configs';
import CButton from './atoms/c-button/c-button';
import CSwitch from './atoms/c-switch/c-switch';
import User from './models/User';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: localStorage.getItem("userName") || '',
      theme: localStorage.getItem('theme') || 'dark',
      user: {},
    };
  }

  componentDidMount() {
    const userIdLocal = localStorage.getItem("userId");
    const currentUser = new User({userId: userIdLocal})
    this.setState({user: currentUser})
    console.log("user", this.state.user.name)
    window.addEventListener('storage', () => {
      window.location.href = '/dashboard';
    });
  }

  grabId = (id) => {
    this.setState({ userId: id });
    localStorage.setItem("userId", id);
  }

  grabName = (name) => {
    this.setState({ userName: name });
    localStorage.setItem("userName", name);
  }

  grabTheme = (theme) => {
    this.setState({ theme: theme });
    localStorage.setItem("theme", theme);
  }

  logout = () => {
    this.setState({ userName: '' });
    localStorage.removeItem('userName');
  }

  render() {
    const contextValues = this.state
    return (
      <AchivifyContext.Provider value={contextValues}>
        <div className="App" theme={this.state.theme}>
          <div className='topBar'>
            <CSwitch keyName='theme' values={['light', 'dark']} grabTheme={this.grabTheme} theme={this.state.theme}/>
            <CButton onClick={this.logout} styling="logout" innerText="Logout" />
          </div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login grabName={this.grabName} grabId={this.grabId}/>} />
                <Route path="/dashboard" element={<Dashboard name={contextValues.userName} />} />
                <Route path="/configs" element={<Configs />} />
              </Routes>
            </BrowserRouter>
          </header>
        </div>
      </AchivifyContext.Provider>
    );
  }
}

App.contextType = AchivifyContext;

export default App;
