import { Character } from "./character";

export interface EquipmentSlot {
  id: number;
  characterId: number;
  upperHeadSlot?: number | null;
  midHeadSlot?: number | null;
  lowerHeadSlot?: number | null;
  bodySlot?: number | null;
  rightHandSlot?: number | null;
  leftHandSlot?: number | null;
  robeSlot?: number | null;
  shoesSlot?: number | null;
  accessorySlot01?: number | null;
  accessorySlot02?: number | null;
  ammoSlot?: number | null;
  character: Character;
}
