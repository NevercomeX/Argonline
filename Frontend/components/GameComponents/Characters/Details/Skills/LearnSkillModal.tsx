"use client";

import React from "react";
import { Skill, CharacterSkill } from "@/types";

interface LearnSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: Skill;
  characterId: number;
  onSkillLearned: (newSkill: CharacterSkill) => void;
}

const LearnSkillModal: React.FC<LearnSkillModalProps> = ({
  isOpen,
  onClose,
  skill,
  characterId,
  onSkillLearned,
}) => {
  const handleLearnSkill = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_CHAR_URL}/skills/characterskill/${characterId}/skills/${skill.id}/learn`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        const newSkill: CharacterSkill = await response.json();
        onSkillLearned(newSkill); // Pasar la nueva habilidad aprendida
      }
    } catch (error) {
      console.error("Error al aprender la habilidad:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Aprender Habilidad</h2>
        <p>¿Deseas aprender la habilidad {skill.name}?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleLearnSkill}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Aprender
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnSkillModal;
