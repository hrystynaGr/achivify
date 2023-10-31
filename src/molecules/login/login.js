import React, { useContext, useState } from 'react';

import './login.scss';
import { AchivifyContext } from '../../MyContext';
import { logIn } from '../../helpers/user';

import { ReactComponent as GearSVG } from '../../gear.svg'
import CInput from '../../atoms/c-input/c-input';
import CButton from '../../atoms/c-button/c-button';

function Login() {
  const { theme } = useContext(AchivifyContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleMailChange = (val) => {
    setEmail(val);
  };

  const handlePassChange = (val) => {
    setPassword(val);
  };

  const loggingIn = async () => {
    logIn({ email, password }); // Pass email and password as an object
  };

  return (
    <div className="Login" theme={theme}>
      <GearSVG />
      <CInput type="email" func={handleMailChange} />
      <CInput type="password" func={handlePassChange} />
      <CButton innerText="Submit" type="accent" onClick={loggingIn} />
    </div>
  );
}

export default Login;
