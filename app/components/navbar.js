"use client";

import { useAuth } from '../context/authContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  console.log('EL USUARIO ESSSSSS', user);
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/pages/login');
  };

  // Si no está autenticado, no renderizamos el navbar
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
        {/* Usamos el username directamente si no tienes first_name o last_name */}
        {user && user.username ? (
          <>
            <span
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}  
              className="navbar__user-name"
            >
              {user.username}
            </span>
            {isDropdownOpen && (
              <div className="navbar__dropdown">
                <button onClick={handleLogout} className="navbar__logout-button">
                  Cerrar sesión
                </button>
              </div>
            )}
          </>
        ) : (
          <span>No se pudo cargar el usuario</span>
        )}
      </div>
    </nav>
  );
}
