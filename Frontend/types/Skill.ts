import { CharacterSkill } from "@/types/CharacterSkill";
import { JobName } from "@/types/Enums/JobNameEnum";
import { ElementType } from "react";

export type Skill = {
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
  element?: ElementType;
  script?: string;
  requiredSkills?: any; // JSON
  icon?: string;
  characterSkills: CharacterSkill[];
};