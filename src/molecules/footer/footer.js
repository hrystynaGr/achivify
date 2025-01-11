import React, { useContext, useState } from 'react';

import './footer.scss';
import { AchivifyContext } from '../../MyContext';


function Footer() {
  const { theme } = useContext(AchivifyContext);

  return (
    <footer className="Footer" theme={theme}>
      <div>{'Year 2025'}</div>
      <div>{'(c) Achivify app!'}</div>
    </footer>
  );
}

export default Footer;
