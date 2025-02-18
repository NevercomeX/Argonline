// src/components/GameComponents/Characters/Details/CombatStatsDisplay.tsx
"use client";

import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCombatStats } from "@/utils/gameUtils/combatStatsApi";

interface CombatStats {
  totalStr: number;
  totalAgi: number;
  totalVit: number;
  totalInt: number;
  totalDex: number;
  totalLuk: number;
}

interface CombatStatsDisplayProps {
  characterId: number;
}

const CombatStatsDisplay: React.FC<CombatStatsDisplayProps> = ({
  characterId,
}) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<CombatStats>(
    ["combatStats", characterId],
    () => getCombatStats(characterId, true),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <p>Cargando estadísticas...</p>;
  if (error) return <p>Error cargando estadísticas.</p>;

  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-lg font-bold mb-2">Estadísticas de Combate</h3>
      <ul className="space-y-1">
        <li>Fuerza (STR): {data.totalStr}</li>
        <li>Agilidad (AGI): {data.totalAgi}</li>
        <li>Vitalidad (VIT): {data.totalVit}</li>
        <li>Inteligencia (INT): {data.totalInt}</li>
        <li>Destreza (DEX): {data.totalDex}</li>
        <li>Suerte (LUK): {data.totalLuk}</li>
      </ul>
      <button
        onClick={() =>
          queryClient.invalidateQueries(["combatStats", characterId])
        }
        className="mt-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Actualizar Estadísticas
      </button>
    </div>
  );
};

export default CombatStatsDisplay;
