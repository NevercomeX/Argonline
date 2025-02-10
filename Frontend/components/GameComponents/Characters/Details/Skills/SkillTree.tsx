"use client";

import React from "react";
import { Skill, CharacterSkill } from "@/types";

interface SkillTreeProps {
  skillTree: Skill[];
  characterSkills: CharacterSkill[];
  onLearnSkill: (skill: Skill) => void;
  onLevelUpSkill: (skill: Skill) => void;
}

const SkillTree: React.FC<SkillTreeProps> = ({
  skillTree,
  characterSkills,
  onLearnSkill,
  onLevelUpSkill,
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Árbol de Habilidades</h3>
      <div className="grid grid-cols-3 gap-4">
        {skillTree.map((skill) => {
          const characterSkill = characterSkills.find(
            (cs) => cs.skillId === skill.id
          );
          const isLearned = !!characterSkill;

          return (
            <div
              key={skill.id}
              className={`p-4 rounded-lg shadow-md flex flex-col items-center justify-center ${
                isLearned ? "bg-blue-100" : "bg-gray-200 opacity-50"
              }`}
              onClick={() => {
                if (isLearned) {
                  onLevelUpSkill(skill);
                } else {
                  onLearnSkill(skill);
                }
              }}
            >
              <span className="font-semibold">{skill.name}</span>
              {isLearned && (
                <span className="text-sm text-gray-600">
                  Nivel: {characterSkill.level}/{skill.maxLevel}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillTree;
