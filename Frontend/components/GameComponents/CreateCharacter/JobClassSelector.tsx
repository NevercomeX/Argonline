"use client";

import React, { useEffect } from "react";
import { jobSprites } from "../Jobs/JobSpritesMap";

interface JobClassSelectorProps {
  value: string; // El valor actual del trabajo, controlado desde el contexto
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Callback para actualizar el valor
}

const JobClassSelector: React.FC<JobClassSelectorProps> = ({
  value,
  onChange,
}) => {
  // Reset to "NOVICE" on component mount or rerender
  useEffect(() => {
    if (!value) {
      onChange({
        target: { value: "NOVICE" },
      } as React.ChangeEvent<HTMLSelectElement>);
    }
  }, [value, onChange]);

  return (
    <div>
      <label className="block font-medium mb-1">Job Class</label>
      <select
        title="Job Class"
        value={value || "NOVICE"} // Default to "NOVICE" if value is empty
        onChange={onChange} // Actualiza el contexto al cambiar la selección
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="NOVICE">Novice</option>
        <option value="SWORDSMAN">Swordsman</option>
        <option value="ARCHER">Archer</option>
        <option value="MAGICIAN">Mage</option>
        <option value="MERCHANT">Merchant</option>
        <option value="THIEF">Thief</option>
        <option value="ACOLYTE">Acolyte</option>
        <option value="SUPERNOVICE">Super Novice</option>
        <option value="HUNTER">Hunter</option>
        <option value="CHICKEN">Chicken</option>
        <option value="NINJA">Ninja</option>
        <option value="ALCHEMIST">Alchemist</option>
        <option value="ASSASSIN">Assassin</option>
        <option value="BARD">Bard</option>
        <option value="BLACKSMITH">Blacksmith</option>
        <option value="CRUSADER">Crusader</option>
        <option value="DANCER">Dancer</option>
        <option value="GUNSLINGER">Gunslinger</option>
        <option value="KNIGHT">Knight</option>
        <option value="MONK">Monk</option>
        <option value="PRIEST">Priest</option>
        <option value="ROGUE">Rogue</option>
        <option value="SAGE">Sage</option>
        <option value="WIZARD">Wizard</option>
      </select>
      <div className="mt-4 flex justify-center">
        {/* Muestra el GIF basado en el valor del contexto */}
        <img
          src={`${jobSprites[value || "NOVICE"]}.gif`} // Default to "NOVICE" if value is empty
          alt="Selected Job Sprite"
          className="w-32 h-32 object-contain"
        />
      </div>
    </div>
  );
};

export default JobClassSelector;
