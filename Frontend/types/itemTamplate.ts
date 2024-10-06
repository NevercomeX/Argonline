import {ItemInstance} from "./itemInstance"

export interface ItemTemplate {
    id: number;
    name: string;
    itemType: string;
    itemSubType: string;
    equipmentSlot: string;
    description: string;
    price: number;
    attackPower: number;
    magicPower: number;
    defense: number;
    magicDefense: number;
    health: number;
    mana: number;
    str: number;
    agi: number;
    vit: number;
    int: number;
    dex: number;
    luk: number;
    slot: number;
    weaponType: string;
    usable: boolean;
    rarity: string;
    effect?: string | null;
    equipable: boolean;
    itemInstances: ItemInstance[];
  }