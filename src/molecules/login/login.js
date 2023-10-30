import React, { useContext, useState } from 'react';
//didn'k work, can't figure our why
// import { redirect } from 'react-router'
import './login.scss';
import { AchivifyContext } from '../../MyContext';
import { ReactComponent as GearSVG } from '../../gear.svg'
import CInput from '../../atoms/c-input/c-input';
import CButton from '../../atoms/c-button/c-button';
import { logIn } from '../../helpers/user';

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
    logIn({ email, password}); // Pass email and password as an object
  };

  return (
    <div className="Login" theme={theme}>
      <GearSVG />
      <CInput type="email" func={handleMailChange} />
      <CInput type="password" func={handlePassChange} />
      <CButton innerText="Submit" styling="submit" onClick={loggingIn} />
    </div>
  );
}

export default Login;
