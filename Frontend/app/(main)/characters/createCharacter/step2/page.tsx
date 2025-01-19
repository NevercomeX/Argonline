"use client";

import { useRouter } from "next/navigation";
import { useCharacterCreation } from "../context/CharacterCreationContext";
import { useAuth } from "../../../../../components/auth/context/AuthContext";

const Step2 = () => {
  const router = useRouter();
  const { getUserId } = useAuth();
  const { name, jobClass, attributes, gender, setGender, selectedSprite } = useCharacterCreation();

  const handleSubmit = async () => {
  if (!name || !jobClass || !gender) {
    alert("Please fill out all required fields before submitting.");
    return;
  }

  try {
    const userId = await getUserId();
    const response = await fetch(`http://localhost:4001/api/characters/${userId}/characters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        jobClass,
        attributes,
        gender: gender === "Male" ? "M" : "F", // Convierte a "M" o "F"
      }),
    });

    if (response.ok) {
      const data = await response.json();
      alert(`Character "${data.name}" created successfully!`);
      router.push("/characters");
    } else {
      const error = await response.json();
      alert(`Failed to create character: ${error.message || "Unknown error"}`);
    }
  } catch (err) {
    console.error("Error creating character:", err);
    alert("An error occurred while creating the character. Please try again.");
  }
};

  // Mapeo de rutas para imágenes de géneros
  const genderSprites: { [key: string]: { Male: string; Female: string } } = {
    1: {
      Male: "/jobgender/novice/NOVICE_M.gif",
      Female: "/jobgender/novice/NOVICE_F.gif",
    },
    2: {
      Male: "/jobgender/firstclass/SWORDMAN_M.gif",
      Female: "/jobgender/firstclass/SWORDMAN_F.gif",
    },
    3: {
      Male: "/jobgender/firstclass/ARCHER_M.gif",
      Female: "/jobgender/firstclass/ARCHER_F.gif",
    },
    4: {
      Male: "/jobgender/firstclass/MAGICIAN_M.gif",
      Female: "/jobgender/firstclass/MAGICIAN_F.gif",
    },
    5: {
      Male: "/jobgender/firstclass/MERCHANT_M.gif",
      Female: "/jobgender/firstclass/MERCHANT_F.gif",
    },
    6: {
      Male: "/jobgender/firstclass/THIEF_M.gif",
      Female: "/jobgender/firstclass/THIEF_F.gif",
    },
    7: {
      Male: "/jobgender/firstclass/ACOLYTE_M.gif",
      Female: "/jobgender/firstclass/ACOLYTE_F.gif",
    },
  };

  // Genera la ruta del sprite dinámicamente según el jobClass y el género
  const selectedstep2Sprite =
    genderSprites[jobClass]?.[gender as "Male" | "Female"] || "/jobgender/novice/NOVICE_M.gif";
  
  console.log(gender);

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Step 2: Select Gender</h2>

      {/* Previsualización dinámica */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Character Preview</h3>
        <div className="flex justify-center items-center">
          <img
            src={selectedstep2Sprite} // Ruta del sprite dinámico
            alt={`${jobClass} - ${gender}`}
          className="mx-auto mb-4"
          style={{ width: 100, height: 100, objectFit: 'contain' }} // Tamaño fijo
          />
        </div>
      </div>

      {/* Botones para seleccionar género */}
      <div className="space-y-4 flex justify-evenly mt-6">
        <button
          onClick={() => setGender("Male")} // Cambiar a masculino
          className={`w-1/4 p-2 rounded ${
            gender === "Male" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Male
        </button>
        <button
          onClick={() => setGender("Female")} // Cambiar a femenino
          className={`w-1/4 p-2 rounded ${
            gender === "Female" ? "bg-pink-500 text-white" : "bg-gray-200"
          }`}
        >
          Female
        </button>
      </div>

      {/* Botón para enviar */}
      <button
        onClick={handleSubmit}
        className="w-full p-2 mt-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Submit
      </button>
    </div>
  );
};

export default Step2;
