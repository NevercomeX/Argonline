import { Character } from "@/types/Character";
import { Skill } from "@/types/Skill";


export type CharacterSkill = {
  id: number;
  characterId: number;
  skillId: number;
  level: number;
  character: Character;
  skill: Skill;
};
