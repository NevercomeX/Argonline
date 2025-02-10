import { CharacterSkill } from "@/types/CharacterSkill";
import { EquipmentItem } from "@/types/EquipmentItem";
import { Guild } from "@/types/Guild";
import { GuildMember } from "@/types/GuildMember";
import { InventoryItem } from "@/types/InventoryItem";
import { JobName } from "@/types/Enums/JobNameEnum";
import { User } from "@/types/User";
import { ElementType } from "@/types/Enums/ElementTypeEnum";



export type Character = {
  id: number;
  name: string;
  userId: number;
  jobclass: JobName;
  str: number;
  agi: number;
  vit: number;
  int: number;
  dex: number;
  luk: number;
  baseLevel: number;
  jobLevel: number;
  baseExp: bigint;
  maxBaseExp: bigint;
  maxJobExp: bigint;
  jobExp: bigint;
  zeny: number;
  statusPoints: number;
  skillPoints: number;
  health: number;
  maxHealth: number;
  maxMana: number;
  mana: number;
  attackSpeed: number;
  attackRange: number;
  element: ElementType;
  map: string;
  x: number;
  y: number;
  user: User;
  inventory: InventoryItem[];
  equipment: EquipmentItem[];
  skills: CharacterSkill[];
  partyId?: number;
  guildId?: number;
  homunculusId?: number;
  guildMembership?: GuildMember;
  ledGuild?: Guild;
  gender: string;
}