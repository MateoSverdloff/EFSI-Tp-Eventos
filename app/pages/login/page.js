"use client";

import React, { createContext, useState, useContext } from 'react'; // Importa todo desde aquí
import { useAuth } from '../../context/authContext'; 
import { useRouter } from 'next/navigation.js';
import { login as loginService } from '../../api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await loginService({ username, password });
      if (response.success) {
        setIsAuthenticated(true);
        setUser(response.user);
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
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Componente LoginPage
export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      router.push('../../pages/eventos'); // Cambia a la ruta correcta
    } catch (error) {
      console.error(error);
      setError('Login failed: ' + error.message);
    }
  };

  const redirectToRegister = () => {
    router.push('./register');
  };

  return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>

      <form onSubmit={handleSubmit}>
        <h3>Login Here</h3>

        {error && <p className="error">{error}</p>}

        <label htmlFor="username">Username</label>
        <input
          type="email"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log In</button>

        <div className="social">
          <div className="go" onClick={redirectToRegister}>
            <i className="fab fa-google"></i> Register
          </div>
          <div className="fb">
            <i className="fab fa-facebook"></i> Facebook
          </div>
        </div>
      </form>
    </div>
  );
}
