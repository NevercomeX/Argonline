"use client";

import React, { useState } from "react";
import { Skill, CharacterSkill } from "../../../../types";
import SkillTree from "./SkillTree";
import LearnSkillModal from "./LearnSkillModal";
import LevelUpSkillModal from "./LevelUpSkillModal";

interface SkillTreeSectionProps {
  skillTree: Skill[];
  characterSkills: CharacterSkill[];
  characterId: number;
}

const SkillTreeSection: React.FC<SkillTreeSectionProps> = ({
  skillTree,
  characterSkills: initialCharacterSkills,
  characterId,
}) => {
  const [characterSkills, setCharacterSkills] = useState(
    initialCharacterSkills
  );
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const handleLearnSkill = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsLearnModalOpen(true);
  };

  const handleLevelUpSkill = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsLevelUpModalOpen(true);
  };

  const closeModals = () => {
    setIsLearnModalOpen(false);
    setIsLevelUpModalOpen(false);
    setSelectedSkill(null);
  };

  const onSkillLearned = (newSkill: CharacterSkill) => {
    setCharacterSkills((prevSkills) => [...prevSkills, newSkill]);
    closeModals();
  };

  const onSkillLeveledUp = (updatedSkill: CharacterSkill) => {
    setCharacterSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.id === updatedSkill.id ? updatedSkill : skill
      )
    );
    closeModals();
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Árbol de Habilidades</h2>
      <div className="grid grid-cols-1 gap-6">
        <SkillTree
          skillTree={skillTree}
          characterSkills={characterSkills}
          onLearnSkill={handleLearnSkill}
          onLevelUpSkill={handleLevelUpSkill}
        />
      </div>

      {selectedSkill && (
        <>
          <LearnSkillModal
            isOpen={isLearnModalOpen}
            onClose={closeModals}
            skill={selectedSkill}
            characterId={characterId}
            onSkillLearned={onSkillLearned}
          />
          <LevelUpSkillModal
            isOpen={isLevelUpModalOpen}
            onClose={closeModals}
            skill={selectedSkill}
            characterId={characterId}
            onSkillLeveledUp={onSkillLeveledUp}
          />
        </>
      )}
    </div>
  );
};

export default SkillTreeSection;
