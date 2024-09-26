"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Verifica la importación

export default function CatalogPage() {
  const [items, setItems] = useState([]);
  const router = useRouter(); 

  const createEvent = (title, description, icon) => ({
    title,
    description,
    icon,
  });

  useEffect(() => {
    const initialItems = [
      createEvent(
        'Evento 1',
        'Descripción del Evento 1.',
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5 3.5C14.5 3.5 14.5 5.5 12 5.5C9.5 5.5 9.5 3.5 9.5 3.5H7.5L4.20711 6.79289C3.81658 7.18342 3.81658 7.81658 4.20711 8.20711L6.5 10.5V20.5H17.5V10.5L19.7929 8.20711C20.1834 7.81658 20.1834 7.18342 19.7929 6.79289L16.5 3.5H14.5Z" />
        </svg>
      ),
      createEvent(
        'Evento 2',
        'Descripción del Evento 2.',
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 9.5V5.5C4.5 4.94772 4.94772 4.5 5.5 4.5H9.5C10.0523 4.5 10.5 4.94772 10.5 5.5V9.5C10.5 10.0523 10.0523 10.5 9.5 10.5H5.5C4.94772 10.5 4.5 10.0523 4.5 9.5Z" />
          <path d="M13.5 18.5V14.5C13.5 13.9477 13.9477 13.5 14.5 13.5H18.5C19.0523 13.5 19.5 13.9477 19.5 14.5V18.5C19.5 19.0523 19.0523 19.5 18.5 19.5H14.5C13.9477 19.5 13.5 19.0523 13.5 18.5Z" />
        </svg>
      ),
    ];

    setItems(initialItems);
  }, []);

  const handleAddEvent = () => {
    const newEvent = createEvent(
      'Nuevo Evento',
      'Ejemplo de un nuevo evento.',
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L19 21H5L12 2Z" />
      </svg>
    );

    setItems((prevItems) => [...prevItems, newEvent]);
  };

  const handleCardClick = (eventTitle) => {
    console.log("Card clicked:", eventTitle); // Para depuración
    router.push(`./description?event=${encodeURIComponent(eventTitle)}`);
  };

  return (
    <div className="grid">
      {items.map((item, index) => (
        <div key={index} className="card" onClick={() => handleCardClick(item.title)}>
          <span className="icon">{item.icon}</span>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
        </div>
      ))}
      <button onClick={handleAddEvent}>Agregar Evento</button> {/* Botón para agregar un nuevo evento */}
    </div>
  );
}
