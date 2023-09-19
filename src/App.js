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
import SignIn from './molecules/sign-in/sign-in';
import { userLoad, isLoggedIn, logOut } from './helpers/user'
import { pageName } from './helpers/shared';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoggedIn: '',
      theme: localStorage.getItem('theme') || 'dark',
    };
  }

  componentDidMount = () => {
    userLoad(this);
    isLoggedIn(this);
    window.addEventListener('storage', () => {
      window.location.href = '/dashboard';
    });
  }


  grabTheme = (theme) => {
    this.setState({ theme: theme });
    localStorage.setItem("theme", theme);
  }

  logout = () => {
    logOut(this);
  }

  signin = () => {
    window.location.href = '/signin';
  }

  login = () => {
    window.location.href = '/login';
  }

  render() {
    let button;
    const contextValues = this.state;
    if (pageName() === 'login' || pageName() === 'signin') {
      const currpageName = pageName() === 'login'? 'signin' : 'login';
      button = <CButton onClick={this[currpageName]} styling={currpageName} innerText={currpageName} />
    }
    else if (this.state.isLoggedIn) {
      button = <CButton onClick={this.logout} styling="logout" innerText="logout" />
    }
    else {
      button =
        <div style={{ display: 'flex' }}>
          <CButton onClick={this.login} styling="login" innerText="login" />
          <CButton onClick={this.signin} styling="signin" innerText="signin" />
        </div>
    }
    return (
      <AchivifyContext.Provider value={contextValues}>
        <div className="App" theme={contextValues.theme}>
          <div className='topBar'>
            <CSwitch keyName='theme' values={['light', 'dark']} grabTheme={this.grabTheme} />
            {button}
          </div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/configs" element={<Configs />} />
                <Route path="/signin" element={<SignIn />} />
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
