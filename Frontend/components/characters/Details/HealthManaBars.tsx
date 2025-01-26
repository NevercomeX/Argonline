// components/Characters/Details/HealthManaBars.tsx
import React from "react";

interface HealthManaBarsProps {
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
}

const HealthManaBars = ({
  health,
  maxHealth,
  mana,
  maxMana,
}: HealthManaBarsProps) => {
  return (
    <div className="border p-4 rounded-lg bg-gray-50 shadow">
      <h2 className="text-xl font-bold mb-4">Health & Mana</h2>
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">HP</label>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-red-500 h-4 rounded-full"
            style={{ width: `${(health / maxHealth) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {health}/{maxHealth}
        </p>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">MP</label>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${(mana / maxMana) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {mana}/{maxMana}
        </p>
      </div>
    </div>
  );
};

export default HealthManaBars;