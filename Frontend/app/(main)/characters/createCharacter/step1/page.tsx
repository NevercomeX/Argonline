// app/characters/createCharacter/step1/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useCharacterCreation } from "../context/CharacterCreationContext";
import FormInput from "../../../../../components/Characters/CreateCharacter/FormInput";
import AttributeDistribution from "../../../../../components/Characters/CreateCharacter/AttributeDistribution";
import JobClassSelector from "../../../../../components/Characters/CreateCharacter/JobClassSelector";
import { useState } from "react";

const initialAttributes = {
  str: 0,
  agi: 0,
  vit: 0,
  int: 0,
  dex: 0,
  luk: 0,
};

const Step1 = () => {
  const router = useRouter();
  const {
    name,
    jobClass,
    attributes,
    setName,
    setJobClass,
    setAttributes,
    setSelectedSprite,
  } = useCharacterCreation();

  const [points, setPoints] = useState(10);
  const [nameError, setNameError] = useState<string | null>(null);

  const handleAttributeChange = (attribute: keyof typeof initialAttributes, increment: boolean) => {
    if (increment && points <= 0) return;
    if (!increment && attributes[attribute] <= 0) return;

    setAttributes({
      ...attributes,
      [attribute]: attributes[attribute] + (increment ? 1 : -1),
    });
    setPoints(points + (increment ? -1 : 1));
  };

  const handleNameChange = (value: string) => {
    // Validación del nombre
    const maxLength = 8;
    const regex = /^[a-zA-Z0-9]*$/; // Permitir solo letras y números

    if (value.length > maxLength) {
      setNameError(`Name cannot exceed ${maxLength} characters.`);
    } else if (!regex.test(value)) {
      setNameError("Name can only contain letters and numbers.");
    } else {
      setNameError(null); // Sin errores
    }

    setName(value.slice(0, maxLength)); // Cortar el nombre si excede el límite
  };

  const handleNext = () => {
    if (!name || !jobClass) {
      alert("Please fill out all fields before proceeding.");
      return;
    }
    if (nameError) {
      alert(nameError);
      return;
    }

    // Define la ruta del sprite según el jobClass seleccionado
    const spritePath = `/jobgender/firstclass/${jobClass}_M.gif`; // Por defecto, selecciona el sprite masculino
    setSelectedSprite(spritePath); // Actualiza el sprite en el contexto
    router.push("/characters/createCharacter/step2");
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Step 1: Character Basics</h2>
      <FormInput
        label="Name"
        value={name}
        onChange={(e) => handleNameChange(e.target.value)}
      />
      {nameError && (
        <p className="text-red-500 text-sm mt-2">{nameError}</p> // Muestra el error si existe
      )}
      <JobClassSelector value={jobClass} onChange={(e) => setJobClass(e.target.value)} />
      <AttributeDistribution
        attributes={attributes}
        points={points}
        onAttributeChange={handleAttributeChange}
      />
      <button
        onClick={handleNext}
        className="w-full p-2 mt-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Next: Select Gender
      </button>
    </div>
  );
};

export default Step1;
