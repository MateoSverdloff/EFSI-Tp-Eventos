"use client"

import Link from 'next/link';

export default function App() {
  return (
    <div>
      <nav>
        <Link href="/pages/login">Login</Link>
        <Link href="./pages/register">Register</Link>
        <Link href="/pages/catalog">Catalog</Link>
      </nav>

      {/* Aquí puedes agregar el contenido principal de la página de inicio */}
    </div>
  );
}
