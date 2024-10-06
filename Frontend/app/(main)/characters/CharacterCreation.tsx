import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CharacterCreationPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [name, setName] = useState('');
  const [jobClass, setJobClass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateCharacter = async () => {
    try {
      const response = await fetch(`http://localhost:4001/api/users/${userId}/characters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name, jobClass }),
      });

      if (response.ok) {
        navigate(`/users/${userId}/characters`); // Redirigir a la lista de personajes después de crear
      } else {
        setError('Error al crear el personaje');
      }
    } catch (err) {
      setError('Error al crear el personaje');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Crear un nuevo personaje</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <input
          className="border p-2 mb-4 w-full"
          type="text"
          placeholder="Nombre del personaje"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
         title='jobClass'
          className="border p-2 mb-4 w-full"
          value={jobClass}
          onChange={(e) => setJobClass(e.target.value)}
        >
          <option value="">Selecciona una clase</option>
          <option value="1">Guerrero</option>
          <option value="2">Mago</option>
          <option value="3">Arquero</option>
          {/* Agrega más clases si es necesario */}
        </select>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleCreateCharacter}
        >
          Crear Personaje
        </button>
      </div>
    </div>
  );
};

export default CharacterCreationPage;
