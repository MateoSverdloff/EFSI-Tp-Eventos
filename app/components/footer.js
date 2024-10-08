"use client"

import { useAuth } from '../context/authContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Footer(){
    const { user, logout } = useAuth();



return (
    <>
      {user && (
        <footer className="footer">
            <p>©Mateo Y Manuel</p>
        </footer>
      )}
    </>
  );

}