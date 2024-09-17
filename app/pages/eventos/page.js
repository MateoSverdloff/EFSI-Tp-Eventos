"use client"
import { useState, useEffect } from 'react';

export default function CatalogPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Aquí deberías obtener los datos para el catálogo desde una API o una fuente de datos
    // Ejemplo:
    // fetch('/api/catalog')
    //   .then(response => response.json())
    //   .then(data => setItems(data));

    // Por ahora, usaremos datos simulados
    const fetchData = async () => {
      const mockData = [
        { name: 'Item 1', description: 'Description for item 1' },
        { name: 'Item 2', description: 'Description for item 2' },
        { name: 'Item 3', description: 'Description for item 3' }
      ];
      setItems(mockData);
    };

    fetchData();
  }, []);

  return (
    <div className="catalog">
      <h1>Catalog</h1>
      <div className="card-container">
        {items.map((item, index) => (
          <div key={index} className="card">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .catalog {
          padding: 20px;
        }
        .card-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        .card {
          border: 1px solid #ddd;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          flex: 1 1 calc(33.333% - 20px);
        }
      `}</style>
    </div>
  );
}
