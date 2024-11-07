"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getEvents, enrollInEvent, unsubscribeFromEvent  } from '../../api.js';
import { useAuth } from '../../context/authContext.js';
import { useRouter } from 'next/navigation';



export default function DescripcionPage() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('event');
  const [eventDetails, setEventDetails] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      alert("No tienes autorización para acceder a esta página. Por favor, inicia sesión.");
      router.push('/pages/login');
    }
  }, [isAuthenticated, router]);


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

  const handleEnrollment = async () => {
    if (!isAuthenticated) return; // Asegurarse de que el usuario esté autenticado

    const storedUser = localStorage.getItem('user');
    const userData = storedUser ? JSON.parse(storedUser) : null;
    const token = userData ? userData.token : null; // Obtener el token

    try {
      if (isEnrolled) {
        // Si ya está inscrito, llamar a la función de desinscripción
        const response = await unsubscribeFromEvent(eventId, token);
        setIsEnrolled(false); // Actualizar el estado de inscripción
        console.log('Desinscrito:', response);
      } else {
        // Si no está inscrito, llamar a la función de inscripción
        const response = await enrollInEvent(eventId, token);
        setIsEnrolled(true); // Actualizar el estado de inscripción
        console.log('Inscrito:', response);
      }
    } catch (error) {
      console.error('Error en la inscripción/desinscripción:', error);
    }
  };

  const toggleLocation = () => {
    setShowLocation(prev => !prev); // Alternar el estado de mostrar la ubicación
  };

  if (!eventDetails) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <main className="l-card">
        <section className="l-card__text">
          <h1>{eventDetails.name}</h1>
          <h4>{eventDetails.description}</h4>
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
        <section className="l-card__location">
          <h2>Lugar del Evento</h2>
          <p onClick={toggleLocation} style={{ cursor: 'pointer' }}>
            <strong>{eventDetails.event_location.name}</strong>
          </p>
          <p onClick={toggleLocation} style={{ cursor: 'pointer' }}>
            {eventDetails.event_location.full_address}
          </p>
          {showLocation && (
            <p>
              <strong>Ubicación:</strong> {eventDetails.event_location.location.name}, {eventDetails.event_location.location.province.full_name}
            </p>
          )}
        </section>
        <section className="l-card__userInfo">
          <span>{eventDetails.creator_user.first_name} {eventDetails.creator_user.last_name} (Organizador)</span>
        </section>

        {/* Botón de inscripción/desinscripción */}
        <button onClick={handleEnrollment} className="enrollment-button">
          {isEnrolled ? 'Desinscribirse' : 'Inscribirse'}
        </button>
      </main>
    </div>
  );
}