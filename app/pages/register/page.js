"use client";

import { useState } from 'react';
import { register } from '../../api.js';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [last_name, setLastName] = useState('');
  const [first_name, setFirstName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('el usuario es: ', username, password, last_name, first_name)
    try {
      const response = await register({ username, password, last_name, first_name });
      console.log('el usuario es: ', username, password, last_name, first_name)
      console.log('Register successful:', response);
    } catch (error) {
      console.error('Register failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input
        type="email"
        placeholder="Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nombre"
        value={first_name}  // Asegúrate de que coincide con first_name
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Apellido"
        value={last_name}  // Asegúrate de que coincide con last_name
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
}