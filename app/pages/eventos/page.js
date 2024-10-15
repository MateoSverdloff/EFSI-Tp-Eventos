"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Verifica la importación
import { getEvents } from '../../api.js';

export default function CatalogPage() {
  const [items, setItems] = useState([]);
  const router = useRouter(); 

  const createEvent = ({ id, name, description, icon }) => ({
    id,
    title: name,
    description,
    icon,
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventos = await getEvents();
        const initialItems = eventos.map(evento => 
          createEvent({
            id: evento.id,
            name: evento.name,
            description: evento.description,
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5 3.5C14.5 3.5 14.5 5.5 12 5.5C9.5 5.5 9.5 3.5 9.5 3.5H7.5L4.20711 6.79289C3.81658 7.18342 3.81658 7.81658 4.20711 8.20711L6.5 10.5V20.5H17.5V10.5L19.7929 8.20711C20.1834 7.81658 20.1834 7.18342 19.7929 6.79289L16.5 3.5H14.5Z" />
            </svg>
          })
        );
        setItems(initialItems);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleCardClick = (eventId) => {
    console.log("Card clicked:", eventId);
    router.push(`./description?event=${encodeURIComponent(eventId)}`);
  };

  return (
    <div className="scroll-container">
      <div className="grid">
        {items.map((item) => (
          <div key={item.id} className="card" onClick={() => handleCardClick(item.id)}>
            <span className="icon">{item.icon}</span>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
