import React, { useState } from 'react';

import './sign-in.scss';
import { signIn } from '../../helpers/user/sign-in';

import CInput from '../../atoms/c-input/c-input';
import CButton from '../../atoms/c-button/c-button';
import { ReactComponent as GearSVG } from '../../gear.svg'

function SignIn() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (val) => {
    setName(val);
  };

  const handleMailChange = (val) => {
    setEmail(val);
  };

  const handlePassChange = (val) => {
    setPassword(val);
  };

  const handleSignIn = () => {
    signIn({ name, email, password });
  };

  return (
    <div className="SignIn">
      <GearSVG />
      <CInput type="name" sendFromInputToParent={handleNameChange} />
      <CInput type="email" sendFromInputToParent={handleMailChange} />
      <CInput type="password" sendFromInputToParent={handlePassChange} />
      <CButton innerText="Submit" type="accent" onClick={handleSignIn} />
    </div>
  );
}

export default SignIn;
