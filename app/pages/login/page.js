"use client";

import { useState } from 'react';
import { login } from '../../api.js';
import { useRouter } from 'next/navigation.js';

export default function LoginPage() {
  const router = useRouter(); // Debe estar disponible si es client-side
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      console.log('Login successful:', response);
      // Manejar la redirección o almacenamiento de token aquí
    } catch (error) {
      console.error('Login failed:', error);
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