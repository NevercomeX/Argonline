import { Skill } from "./Skill";
import { JobName } from "./Enums/JobNameEnum";

export interface SkillTree {
  id: number;
  jobclassId: number;
  skillId: number;
  requiredSkillId?: number; // Habilidad requerida para desbloquear esta habilidad
  jobclass?: JobName; // Relación con la clase de trabajo
  skill?: Skill; // Relación con la habilidad
}