"use client";

import { useState } from 'react';
import { register } from '../../api.js';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [last_name, setLastName] = useState('');
  const [first_name, setFirstName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ username, password, last_name, first_name });
      console.log('Register successful:', response);
      router.push('./eventos'); //cambiar prro
    } catch (error) {
      console.error('Register failed:', error);
    }
  };
  

  return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>

      <form onSubmit={handleSubmit}>
        <h3>Register Here</h3>

        <label htmlFor="username">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
