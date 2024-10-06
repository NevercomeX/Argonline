import { ItemTemplate } from "./itemTamplate";
import {Character} from "./character"
import { Inventory } from "./inventory";

export interface ItemInstance {
    id: number;
    itemTemplateId: number;
    characterId: number;
    currentAttack: number;
    currentDefense: number;
    currentHealth: number;
    currentMana: number;
    upgradeLevel: number;
    socketedGems?: string | null;
    enchantments?: string | null;
    itemTemplate: ItemTemplate;
    character: Character;
    inventory: Inventory[];
  }