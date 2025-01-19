"use client";

import { useEffect, useState } from "react";
import { Character } from "../../../../types";
import { jobGenderSprites } from "../../../../components/jobs/jobSpritesMap";
import { Radar } from "react-chartjs-2"; // Importamos Radar de react-chartjs-2
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const CharacterDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params; // Obtiene el ID del personaje de los parámetros
  const [character, setCharacter] = useState<Character | null>(null);
  const [spriteGender, setSpriteGender] = useState<string | null>(null);
  const [jobclassid, setJobClassId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`http://localhost:4001/api/characters/${id}`);

        console.log("response", response);
        if (response.ok) {
          const data: Character = await response.json(); // Obtiene los datos del personaje
          setCharacter(data); // Establece los datos en el estado
          setSpriteGender(data.gender);
          setJobClassId(data.jobclassId);
        } else {
          setError("Failed to load character details.");
        }
      } catch (err) {
        setError("An error occurred while fetching character details.");
        console.error(err);
      } finally {
        setLoading(false); // Detiene la carga independientemente del resultado
      }
    };

    fetchCharacter();
  }, [id]); // El efecto se ejecutará cada vez que cambie el ID del personaje

  // Obtener el sprite dinámicamente según el jobclassId y el género del personaje
  const jobSpritePath = jobGenderSprites[jobclassid] || "/default/path.gif";

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!character) return <p>Character not found.</p>;

  // Datos para el gráfico de radar
  const radarData = {
    labels: ["STR", "AGI", "VIT", "INT", "DEX", "LUK"],
    datasets: [
      {
        label: "Character Stats",
        data: [
          character.str,
          character.agi,
          character.vit,
          character.int,
          character.dex,
              character.luk,

        ],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
            pointBackgroundColor: "rgba(54, 162, 235, 1)",
        
        
      },
    ],
  };
console.log(character.str)
  // Opciones para personalizar el gráfico
  const radarOptions = {
    responsive: true,
    scales: {
        r: {
           max: 10, // Máximo valor en la escala
        min: 0, // Mínimo valor en la escala
            angleLines: {
             stepSize: 50, // Intervalo entre las marcas
          
          color: "#ccc", // Color de las líneas angulares
        },
        grid: {
          color: "#ddd", // Color de la cuadrícula
        },
        ticks: {
          display: true, // Mostrar los valores de las escalas
          color: "#333",
        },
        pointLabels: {
          color: "#333", // Color de las etiquetas de los atributos
          font: {
            size: 13,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="border border-gray-300 bg-white p-4 rounded-lg shadow hover:shadow-md hover:bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">{character.name}</h1>
      <img
        src={`${jobSpritePath}_${spriteGender}.gif`} // Usa la ruta generada dinámicamente
        alt={character.name}
        className="mx-auto mb-4"
        style={{ width: 100, height: 100, objectFit: "contain" }} // Tamaño fijo
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="font-medium">Base Level:</span> {character.baseLevel}
        </div>
        <div>
          <span className="font-medium">Job Level:</span> {character.jobLevel}
        </div>
        <div>
          <span className="font-medium">HP:</span> {character.health}
        </div>
        <div>
          <span className="font-medium">Mana:</span> {character.mana}
        </div>
        <div>
          <span className="font-medium">Attack Power:</span> {character.attackPower}
        </div>
        <div>
          <span className="font-medium">Defense:</span> {character.defense}
        </div>
          </div>
          
          <div className="w-full space-y-2">
          {/* Barra de vida */}
          <div className=''>
          <div>
            <label className="text-sm font-medium text-gray-700">HP</label>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-red-500 h-4 rounded-full"
                style={{ width: `${(character.health / character.maxHealth) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {character.health}/{character.maxHealth}
            </p>
          </div>

          {/* Barra de maná */}
          <div>
            <label className="text-sm font-medium text-gray-700">MP</label>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${(character.mana / character.maxMana) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {character.mana}/{character.maxMana}
            </p>
          </div>
          </div>

          {/* Barra de experiencia base */}
          <div>
          <div>
            <label className="text-sm font-medium text-gray-700">Base EXP</label>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${(character.baseExp / character.maxBaseExp) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {character.baseExp}/{character.maxBaseExp}
            </p>
          </div>

          {/* Barra de experiencia de job */}
          <div>
            <label className="text-sm font-medium text-gray-700">Job EXP</label>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-yellow-500 h-4 rounded-full"
                style={{ width: `${(character.jobExp / character.maxJobExp) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {character.jobExp}/{character.maxJobExp}
            </p>
          </div>
        </div>
      </div>

      {/* Contenedor del gráfico de radar */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Stats Overview</h2>
        <Radar data={radarData} options={radarOptions} />
      </div>
    </div>
  );
};

export default CharacterDetailsPage;
