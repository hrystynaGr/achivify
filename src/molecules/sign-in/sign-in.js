import React, { useState } from 'react';
import { signIn } from '../../helpers/user';
import './sign-in.scss';
import CInput from '../../atoms/c-input/c-input';
import CButton from '../../atoms/c-button/c-button';

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
    signIn({state: { name, email, password }});
  };

  return (
    <div className="signIn">
      <CInput type="name" func={handleNameChange} />
      <CInput type="email" func={handleMailChange} />
      <CInput type="password" func={handlePassChange} />
      <CButton innerText="Submit" styling="submit" onClick={handleSignIn} />
    </div>
  );
}

export default SignIn;
