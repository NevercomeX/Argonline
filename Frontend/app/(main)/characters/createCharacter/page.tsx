"use client";

import { useState } from "react";
import { useAuth } from "../../../../components/auth/context/AuthContext";
import FormInput from "../../../../components/characters/FormInput";
import AttributeDistribution from "../../../../components/characters/AttributeDistribution";
import JobClassSelector from "../../../../components/characters/JobClassSelector";
import RedirectButton from "../../../../components/characters/RedirectButton";

const initialAttributes = {
  str: 0,
  agi: 0,
  vit: 0,
  int: 0,
  dex: 0,
  luk: 0,
};

const CreateCharacterForm = () => {
  const [name, setName] = useState("");
  const [jobClass, setJobClass] = useState("");
  const [points, setPoints] = useState(10);
  const [attributes, setAttributes] = useState(initialAttributes);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { getUserId } = useAuth();

  type AttributeKeys = 'str' | 'agi' | 'vit' | 'int' | 'dex' | 'luk';

  const handleAttributeChange = async (attribute: AttributeKeys, increment: boolean) => {
    if (increment && points <= 0) return;
    if (!increment && attributes[attribute] <= 0) return;
  
    setAttributes((prev) => ({
      ...prev,
      [attribute]: prev[attribute] + (increment ? 1 : -1),
    }));
    setPoints(points + (increment ? -1 : 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const userid = await getUserId();
    e.preventDefault();

    if (!name || !jobClass) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4001/api/characters/${userid}/characters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          jobClass,
          attributes,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(`Character "${data.name}" created successfully!`);
        setName("");
        setJobClass("");
        setAttributes(initialAttributes);
        setPoints(10);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error creating character.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Create Your Character</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <JobClassSelector value={jobClass} onChange={(e) => setJobClass(e.target.value)} />
        <AttributeDistribution
          attributes={attributes}
          points={points}
          onAttributeChange={handleAttributeChange}
        />
        <button
          type="submit"
          className="w-full p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Create Character
        </button>
      </form>
      <RedirectButton url="http://localhost:3000/characters/createCharacter" />
    </div>
  );
};

export default CreateCharacterForm;
