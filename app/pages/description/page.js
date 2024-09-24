"use client";

import { useSearchParams } from 'next/navigation';

export default function DescripcionPage() {
  const searchParams = useSearchParams();
  const eventTitle = searchParams.get('event');

  return (
    <div>
      <main className="l-card">
        <section className="l-card__text">
          <p>
            Aquí iría la descripción detallada del evento: <strong>{eventTitle}</strong>. 
            Este es un comentario sobre este evento, mostrado sobre un fondo con puntos, ¡y eso es realmente genial!
          </p>
        </section>
        <section className="l-card__user">
          <div className="l-card__userImage">
            <img
              src=""
              alt="Imagen de Usuario"
            />
          </div>
          <div className="l-card__userInfo">
            <span>{eventTitle} Organizador</span>
            <span>Descripción del organizador</span>
          </div>
        </section>
      </main>
    </div>
  );
}
