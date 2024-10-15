"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getEvents } from '../../api.js';

export default function DescripcionPage() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('event');
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const events = await getEvents();
        const event = events.find(evt => evt.id === parseInt(eventId));
        setEventDetails(event);
      } catch (error) {
        console.error('Error al obtener los detalles del evento:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (!eventDetails) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <main className="l-card">
        <section className="l-card__text">
          <h1>{eventDetails.name}</h1>
          <p>
            {eventDetails.description}
          </p>
          <p>
            <strong>Fecha:</strong> {new Date(eventDetails.start_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Duración:</strong> {eventDetails.duration_in_minutes} minutos
          </p>
          <p>
            <strong>Precio:</strong> ${eventDetails.price}
          </p>
          <p>
            <strong>Capacidad máxima:</strong> {eventDetails.max_assistance}
          </p>
        </section>
        <section className="l-card__userInfo">
          <span>{eventDetails.creator_user.first_name} {eventDetails.creator_user.last_name} (Organizador)</span>
          <span>Descripción del organizador</span>
        </section>
        <section className="l-card__location">
          <h2>Lugar del Evento</h2>
          <p><strong>{eventDetails.event_location.name}</strong></p>
          <p>{eventDetails.event_location.full_address}</p>
          <p><strong>Ubicación:</strong> {eventDetails.event_location.location.name}, {eventDetails.event_location.location.province.full_name}</p>
        </section>
      </main>
    </div>
  );
}