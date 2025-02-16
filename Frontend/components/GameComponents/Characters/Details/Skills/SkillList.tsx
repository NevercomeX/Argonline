"use client";

import React from "react";
import { CharacterSkill } from "@/types";

interface SkillListProps {
  characterSkills: CharacterSkill[];
}

const SkillList: React.FC<SkillListProps> = ({ characterSkills }) => {
  console.log(characterSkills);
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Habilidades Aprendidas</h3>
      <div className="grid grid-cols-3 gap-4">
        {characterSkills.map((characterSkill) => (
          <div
            key={characterSkill.id}
            className="p-4 bg-blue-100 rounded-lg shadow-md flex flex-col items-center justify-center"
          >
            <span className="font-semibold">{characterSkill.name}</span>
            <span className="text-sm text-gray-600">
              Nivel: {characterSkill.level}/{characterSkill.maxLevel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillList;
