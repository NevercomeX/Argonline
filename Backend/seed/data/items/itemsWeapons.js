export const itemsWeapons = [
  {
    name: "Iron Sword",
    type: "WEAPON", // Enum ItemType: WEAPON
    description: "A basic iron sword.",
    buyPrice: 200,
    sellPrice: 100,
    weight: 5,
    attack: 15,
    magicAttack: 0,
    defense: 0,
    magicDefense: 0,
    requiredLevel: 1,
    slot: 1,
    // Para armas, se indica en qué slot se puede equipar (usando valores del enum EquipmentSlot).
    equipSlots: ["WEAPON"],
    script: "",
    isStackable: false,
    maxStack: 1,
    isTradable: true,
    isConsumable: false,
    element: "NEUTRAL",
    cardSlots: 0,
    sprite: "https://example.com/images/iron_sword.png"
  },
  {
    name: "Steel Axe",
    type: "WEAPON",
    description: "A heavy axe forged from steel.",
    buyPrice: 350,
    sellPrice: 175,
    weight: 7,
    attack: 25,
    magicAttack: 0,
    defense: 0,
    magicDefense: 0,
    requiredLevel: 2,
    slot: 1,
    equipSlots: ["WEAPON"],
    script: "",
    isStackable: false,
    maxStack: 1,
    isTradable: true,
    isConsumable: false,
    element: "NEUTRAL",
    cardSlots: 0,
    sprite: "https://example.com/images/steel_axe.png"
  }
];
