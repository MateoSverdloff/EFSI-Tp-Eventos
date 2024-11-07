"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService, register as registerService } from '../api.js';  // Agregar registerService
import * as jwt_decode from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Indicador de carga

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const authenticateUser = async (username, password) => {
    try {
      const response = await loginService({ username, password });
      if (response.success) {
        const user = jwt_decode(response.token);
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

  const registerUser = async (username, password, first_name, last_name) => {  // Nueva función para registro
    try {
      const response = await registerService({ username, password, first_name, last_name });
      console.log('RESPUESTA', reponse)
      if (response.success) {
        const user = jwt_decode(response.token);
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

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticateUser, registerUser, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
