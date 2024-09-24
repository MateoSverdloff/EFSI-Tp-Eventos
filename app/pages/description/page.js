"use client"

import { useSearchParams } from 'next/navigation';

export default function DescripcionPage() {
  const searchParams = useSearchParams();
  const eventTitle = searchParams.get('event'); // Obtener el parámetro de la URL

  return (
    <div>
      <h1>Descripción del {eventTitle}</h1>
      <p>Aquí iría la descripción detallada del evento {eventTitle}.</p>
    </div>
  );
}