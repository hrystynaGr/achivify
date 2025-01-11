import React, { useContext, useState, useEffect } from 'react';

import './header.scss';
import { AchivifyContext } from '../../MyContext';
import {
  logOut, 
  userLoad,
} from '../../helpers/user'

import CSwitch from '../../atoms/c-switch/c-switch'
import {ReactComponent as BurgerMenuSVG} from '../../burger-menu.svg'
import CMenuItem from '../../atoms/c-menu-item/c-menu-item'
import CButton from '../../atoms/c-button/c-button';


function Header({saveTheme}) {
  const { theme } = useContext(AchivifyContext);
  const [user, setUser] = useState({});

  const [loggedIn, setLoggedIn] = useState('');
  const [mobileMenuState, setMobileMenuState] = useState('closed');

  useEffect(() => {
    const fetchData = async () => {
      const response = await userLoad();
      setUser(response);
    };
    fetchData();
  })

  const changeMobileMenuState = () => {
    console.log('changeMobileMenuState', mobileMenuState)
    if (mobileMenuState === 'closed') {
      setMobileMenuState('open');
    }
    else {
      setMobileMenuState('closed');
    }
  }

  const signinRedirect = () => {
    window.location.href = '/signin';
  };

  const loginRedirect = () => {
    window.location.href = '/login';
  };

  const logout = () => {
    logOut();
    setUser({});
    setLoggedIn(false);
    loginRedirect();
  };

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

  return (
    <div>
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
    </div>
  );
}

export default Header;
