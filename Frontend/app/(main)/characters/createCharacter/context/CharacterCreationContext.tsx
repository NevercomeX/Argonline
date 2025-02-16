// context/CharacterCreationContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

interface CharacterAttributes {
  str: number;
  agi: number;
  vit: number;
  int: number;
  dex: number;
  luk: number;
}

interface CharacterCreationState {
  name: string;
  jobClass: string;
  attributes: CharacterAttributes;
  gender: string;
  selectedSprite: string; // Nueva propiedad para la ruta del sprite
  setName: (name: string) => void;
  setJobClass: (jobClass: string) => void;
  setAttributes: (attributes: CharacterAttributes) => void;
  setGender: (gender: string) => void;
  setSelectedSprite: (sprite: string) => void; // Nueva función para actualizar el sprite
}

const initialAttributes = {
  str: 0,
  agi: 0,
  vit: 0,
  int: 0,
  dex: 0,
  luk: 0,
};

const CharacterCreationContext = createContext<CharacterCreationState | null>(
  null,
);

export const CharacterCreationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [name, setName] = useState("");
  const [jobClass, setJobClass] = useState("1");
  const [attributes, setAttributes] = useState(initialAttributes);
  const [gender, setGender] = useState("");
  const [selectedSprite, setSelectedSprite] = useState("/default/path.gif"); // Valor inicial

  return (
    <CharacterCreationContext.Provider
      value={{
        name,
        jobClass,
        attributes,
        gender,
        selectedSprite,
        setName,
        setJobClass,
        setAttributes,
        setGender,
        setSelectedSprite, // Proporciona la función
      }}
    >
      {children}
    </CharacterCreationContext.Provider>
  );
};

export const useCharacterCreation = () => {
  const context = useContext(CharacterCreationContext);
  if (!context) {
    throw new Error(
      "useCharacterCreation must be used within CharacterCreationProvider",
    );
  }
  return context;
};
