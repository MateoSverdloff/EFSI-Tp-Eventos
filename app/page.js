"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function App() {
  const router = useRouter();

  useEffect(() => {
    router.push('/pages/login');
  }, [router]);

  return (
    <div>
      <nav>
        <a href="/pages/login">Login</a>
        <a href="/pages/register">Register</a>
        <a href="/pages/catalog">Catalog</a>
      </nav>
    </div>
  );
}