import { JobName } from './JobName';
import { ElementType } from './ElementType';
import { CharacterSkill } from './CharacterSkill';

export interface Skill {
  id: number;
  name: string;
  description: string;
  job: JobName;
  level: number;
  maxLevel: number;
  spCost: number;
  hpCost: number;
  castTime: number;
  cooldown: number;
  target: string;
  range: number;
  area: number;
  element?: ElementType | null;
  script?: string | null;
  requiredSkills?: any | null; // Json
  icon?: string | null;
  characterSkills?: CharacterSkill[];
}
