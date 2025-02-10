"use client";

import React from "react";
import { CharacterSkill, Skill } from "@/types";

interface LevelUpSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: Skill;
  characterId: number;
  onSkillLeveledUp: (updatedSkill: CharacterSkill) => void;
}

const LevelUpSkillModal: React.FC<LevelUpSkillModalProps> = ({
  isOpen,
  onClose,
  skill,
  characterId,
  onSkillLeveledUp,
}) => {
  const handleLevelUpSkill = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_CHAR_URL}/skills/characterskill/${characterId}/skills/${skill.id}/level-up`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        const updatedSkill = await response.json();
        onSkillLeveledUp(updatedSkill); // Actualizar el estado en SkillTreeSection
      }
    } catch (error) {
      console.error("Error al subir de nivel la habilidad:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Subir de Nivel</h2>
        <p>¿Deseas subir de nivel la habilidad {skill.name}?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleLevelUpSkill}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Subir de Nivel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelUpSkillModal;
