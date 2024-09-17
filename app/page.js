"use client"

import Link from 'next/link';

export default function App() {
  return (
    <div>
      <nav>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <Link href="/catalog">Catalog</Link>
      </nav>

      {/* Aquí puedes agregar el contenido principal de la página de inicio */}
    </div>
  );
}
