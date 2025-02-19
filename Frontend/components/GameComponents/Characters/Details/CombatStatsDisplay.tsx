"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getStatsCharacter } from "@/utils/gameUtils/statsApi";
import { getCharacterById } from "@/utils/gameUtils/characterApi";
import { CombatStats } from "@/types/CombatStats";
import { Character } from "@/types";

interface CharacterDetailsProps {
  characterData: Character;
}

const defaultStats: CombatStats = {
  ATK: 0,
  MATK: 0,
  DEF: 0,
  MDEF: 0,
  HP: 0,
  MAXHP: 0,
  SP: 0,
  MAXSP: 0,
  HIT: 0,
  FLEE: 0,
  CRIT: 0,
  ASPD: 0,
};

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  characterData,
}) => {
  const {
    data: character,
    isLoading: loadingCharacter,
    error: errorCharacter,
  } = useQuery<Character>({
    queryKey: ["characterData", characterData.id],
    queryFn: () => getCharacterById(characterData.id),
    refetchOnWindowFocus: false,
  });

  const {
    data: stats = defaultStats,
    isLoading: loadingStats,
    error: errorStats,
  } = useQuery<CombatStats>({
    queryKey: ["characterStats", characterData.id],
    queryFn: () => getStatsCharacter(characterData.id),
    refetchOnWindowFocus: false,
  });

  if (loadingCharacter || loadingStats) return <p>Cargando estadísticas...</p>;
  if (errorCharacter || errorStats)
    return <p>Error al cargar datos del personaje.</p>;

  return (
    <div className="border p-4 rounded-lg bg-gray-50 shadow-md">
      <h2 className="text-xl font-bold mb-2">Detalles del Personaje</h2>
      <p>
        <strong>Nombre:</strong> {character?.name || "Desconocido"}
      </p>
      <p>
        <strong>Clase:</strong> {character?.jobclass || "Sin clase"}
      </p>
      <p>
        <strong>Base Lv:</strong> {character?.baseLevel}
      </p>
      <p>
        <strong>Job Lv:</strong> {character?.jobLevel}
      </p>

      {/* Barras de experiencia */}
      <div className="mt-2">
        <p className="text-sm font-semibold">Exp Base</p>
        <div className="w-full h-4 bg-gray-200 rounded overflow-hidden">
          <div
            className="h-full bg-blue-500"
            style={{
              width: `${(Number(character?.baseExp) / Number(character?.maxBaseExp)) * 100}%`,
            }}
          ></div>
          <p>
            {character?.baseExp}/ {character?.maxBaseExp}
          </p>
        </div>
      </div>

      <div className="mt-2">
        <p className="text-sm font-semibold">Exp Job</p>
        <div className="w-full h-4 bg-gray-200 rounded overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{
              width: `${(Number(character?.jobExp) / Number(character?.maxJobExp)) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Barras de HP y SP */}
      <div className="mt-4">
        <p className="text-sm font-semibold">HP</p>
        <div className="w-full h-5 bg-gray-300 rounded overflow-hidden">
          <div
            className="h-full bg-red-500"
            style={{ width: `${(stats.HP / stats.MAXHP) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm">
          {stats.HP} / {stats.MAXHP}
        </p>
      </div>

      <div className="mt-2">
        <p className="text-sm font-semibold">SP</p>
        <div className="w-full h-5 bg-gray-300 rounded overflow-hidden">
          <div
            className="h-full bg-purple-500"
            style={{ width: `${(stats.SP / stats.MAXSP) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm">
          {stats.SP} / {stats.MAXSP}
        </p>
      </div>

      {/* Estadísticas de combate */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <p>
          <strong>ATK:</strong> {stats.ATK}
        </p>
        <p>
          <strong>MATK:</strong> {stats.MATK}
        </p>
        <p>
          <strong>DEF:</strong> {stats.DEF}
        </p>
        <p>
          <strong>MDEF:</strong> {stats.MDEF}
        </p>
        <p>
          <strong>HIT:</strong> {stats.HIT}
        </p>
        <p>
          <strong>FLEE:</strong> {stats.FLEE}
        </p>
        <p>
          <strong>CRIT:</strong> {stats.CRIT}
        </p>
        <p>
          <strong>ASPD:</strong> {stats.ASPD}
        </p>
      </div>
    </div>
  );
};

export default CharacterDetails;
