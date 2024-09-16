// Tipos para los drops de los monstruos
  export interface Drop {
    id: number;
    name: string;
    rate: number;
    image: string; // URL de la imagen del drop
  }
  
  // Tipo para los monstruos
  export interface Monster {
    id: number;
    name: string;
    attackType: string;
    giveBaseExpAmount: number;
    giveJobExpAmount: number;
    health: number;
    maxHealth: number;
    attackPower: number;
    magicPower: number;
    defense: number;
    magicDefense: number;
    baseLevel: number;
    monsterType: string;
    drops: Drop[];
    mobIcon: string; // URL de la imagen del monstruo
  }
  
  export interface Item {
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
    effect: string;
    equipable: boolean;
    itemIcon: string;

  }

  // Tipo para los personajes
  export interface Character {
    id: number;
    name: string;
    userId: number;
    jobclassId: number;
    str: number;
    agi: number;
    vit: number;
    int: number;
    dex: number;
    luk: number;
    baseLevel: number;
    jobLevel: number;
    baseExp: number;
    jobExp: number;
    maxBaseExp: number;
    maxJobExp: number;
    skillPoints: number;
    health: number;
    maxHealth: number;
    maxMana: number;
    mana: number;
    attackPower: number;
    magicPower: number;
    defense: number;
    magicDefense: number;
    inventory: Item[];
  }