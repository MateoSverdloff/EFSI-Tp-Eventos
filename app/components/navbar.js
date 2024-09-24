"use client";

import { useAuth } from '../context/authConext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout(); 
    router.push('/pages/login');
  };

  return (
    <>
      {user && (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f8f9fa' }}>
          {/* Logo a la izquierda */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/path/to/logo.png" alt="Logo" style={{ height: '40px', marginRight: '1rem' }} />
          </div>

          {/* Links al centro */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <a href="/home" style={{ margin: '0 1rem', textDecoration: 'none', color: 'black' }}>Home</a>
            <a href="/contact" style={{ margin: '0 1rem', textDecoration: 'none', color: 'black' }}>Contacto</a>
          </div>

          {/* Usuario a la derecha */}
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <span
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{ cursor: 'pointer', marginRight: '1rem' }}
            >
              {user.first_name} {user.last_name}
            </span>
            {isDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  padding: '0.5rem',
                }}
              >
                <button onClick={handleLogout} style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'black' }}>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </nav>
      )}
    </>
  );
}
