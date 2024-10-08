"use client";

import { useAuth } from '../context/authContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/pages/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="/path/to/logo.png" alt="Logo" className="navbar__logo-img" />
      </div>

      <div className="navbar__links">
        <a href="../pages/eventos" className="navbar__link">Home</a>
        <a href="../pages/contacto" className="navbar__link">Contacto</a>
      </div>

      <div className="navbar__user">
        <span
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}  
          className="navbar__user-name"
        >
          {user.first_name} {user.last_name}
        </span>
        {isDropdownOpen && (
          <div className="navbar__dropdown">
            <button onClick={handleLogout} className="navbar__logout-button">
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
