import { Character } from './Character';
import { Skill } from './Skill';

export interface CharacterSkill {
  id: number;
  characterId: number;
  skillId: number;
  level: number;
  character?: Character;
  skill?: Skill;
}
