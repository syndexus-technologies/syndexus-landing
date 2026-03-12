'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user was logged in previously (Persist login)
  useEffect(() => {
    const storedUser = localStorage.getItem('syndexus_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Mock Login Function
  const login = (email, name) => {
    const userData = { email, name };
    setUser(userData);
    localStorage.setItem('syndexus_user', JSON.stringify(userData));
  };

  // Mock Signup Function
  const signup = (email, name) => {
    const userData = { email, name };
    setUser(userData);
    localStorage.setItem('syndexus_user', JSON.stringify(userData));
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('syndexus_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);