import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== 'undefined' && typeof token === 'string') {
      const decoded = jwtDecode(token);
      setUser({
        userId: decoded.userId,
        role: decoded.role,
      });
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
