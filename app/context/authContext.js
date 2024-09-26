"use client"

import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService } from '../api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session (e.g., in localStorage or cookies)
    const checkUserSession = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkUserSession();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await loginService({ username, password });
      if (response.success) {
        setIsAuthenticated(true);
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (firstName, lastName, username, password) => {
    // Lógica para registrar al usuario...
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
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};