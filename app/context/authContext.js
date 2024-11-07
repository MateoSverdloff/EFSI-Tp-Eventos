"use client"

import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService } from '../api.js';
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    window.addEventListener('storage', handleStorageChange);
  
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);  
  
  const authenticateUser = async (username, password) => {
    try {
      const response = await loginService({ username, password });
      if (response.success) {
        const user = jwtDecode(response.token);
        setIsAuthenticated(true);
        setUser(user);
        localStorage.setItem('user', JSON.stringify({ ...user, token: response.token }));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw error;
    }
  };
  

  const register = async (firstName, lastName, username, password) => {
    // Lógica para registrar al usuario
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticateUser, register, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
