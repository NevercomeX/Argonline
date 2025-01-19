import React from "react";
import {jobSprites} from "../jobs/jobSpritesMap";

interface JobClassSelectorProps {
  value: string; // El valor actual del trabajo, controlado desde el contexto
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Callback para actualizar el valor
}

const JobClassSelector: React.FC<JobClassSelectorProps> = ({ value, onChange }) => {

  return (
    <div>
      <label className="block font-medium mb-1">Job Class</label>
      <select
        title="Job Class"
        value={value} // Sincronizado con el contexto
        onChange={onChange} // Actualiza el contexto al cambiar la selección
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="1">Novice</option>
        <option value="2">Swordsman</option>
        <option value="3">Archer</option>
        <option value="4">Mage</option>
        <option value="5">Merchant</option>
        <option value="6">Thief</option>
        <option value="7">Acolyte</option>
        <option value="8">Super Novice</option>
        <option value="9">Hunter</option>
        <option value="10">Chicken</option>
        <option value="11">Ninja</option>
        <option value="12">Alchemist</option>
        <option value="13">Assassin</option>
        <option value="14">Bard</option>
        <option value="15">Blacksmith</option>
        <option value="16">Crusader</option>
        <option value="17">Dancer</option>
        <option value="18">Gunslinger</option>
        <option value="19">Knight</option>
        <option value="20">Monk</option>
        <option value="21">Priest</option>
        <option value="22">Rogue</option>
        <option value="23">Sage</option>
        <option value="24">Wizard</option>
      </select>
      <div className="mt-4">
        {/* Muestra el GIF basado en el valor del contexto */}
        <img
          src={jobSprites[value]}
          alt="Selected Job Sprite"
          className="w-32 h-32 object-contain"
        />
      </div>
    </div>
  );
};

export default JobClassSelector;
