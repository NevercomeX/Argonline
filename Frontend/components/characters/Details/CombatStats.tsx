// components/Characters/Details/CombatStats.tsx
import React from "react";

interface CombatStatsProps {
  attackPower: number;
  defense: number;
  magicPower: number;
  magicDefense: number;
}

const CombatStats = ({
  attackPower,
  defense,
  magicPower,
  magicDefense,
}: CombatStatsProps) => {
  return (
    <div className="border p-4 rounded-lg bg-gray-50 shadow">
      <h2 className="text-xl font-bold mb-4">Combat Stats</h2>
      <p>
        <span className="font-medium">Attack Power:</span> {attackPower}
      </p>
      <p>
        <span className="font-medium">Defense:</span> {defense}
      </p>
      <p>
        <span className="font-medium">Magic Power:</span> {magicPower}
      </p>
      <p>
        <span className="font-medium">Magic Defense:</span> {magicDefense}
      </p>
    </div>
  );
};

export default CombatStats;