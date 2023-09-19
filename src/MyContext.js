import { createContext } from 'react';

export const AchivifyContext = createContext({
    theme: 'dark',
    user: {},
    isLoggedIn: false
  });