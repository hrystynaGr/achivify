import { createContext } from 'react';

export const AchivifyContext = createContext({
    theme: 'dark',
    user: {},
    loggedIn: false
  });