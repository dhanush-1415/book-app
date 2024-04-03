// AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize isLogged with the value from localStorage or false if not present
  const [isLogged, setIsLogged] = useState(() => {
    const storedValue = localStorage.getItem('isLogged');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const setLoggedIn = () => {
    setIsLogged(true);
    localStorage.setItem('isLogged', JSON.stringify(true));
  };

  const setLoggedOut = () => {
    setIsLogged(false);
    localStorage.removeItem('bookUserToken');
    localStorage.setItem('isLogged', JSON.stringify(false));
  };

  return (
    <AuthContext.Provider value={{ isLogged, setLoggedIn, setLoggedOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
