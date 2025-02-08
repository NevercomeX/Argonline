export const itemsArmor = [
  {
    name: "Iron Helmet",
    type: "ARMOR", // Enum ItemType: ARMOR
    description: "A sturdy iron helmet for head protection.",
    buyPrice: 150,
    sellPrice: 75,
    weight: 3,
    attack: 0,
    magicAttack: 0,
    defense: 5,
    magicDefense: 2,
    requiredLevel: 1,
    slot: 0,
    // En este caso, se asigna el slot "HEAD_TOP" según el enum EquipmentSlot.
    equipSlots: ["HEAD_TOP"],
    script: "",
    isStackable: false,
    maxStack: 1,
    isTradable: true,
    isConsumable: false,
    element: "NEUTRAL",
    cardSlots: 0,
    sprite: "https://example.com/images/iron_helmet.png"
  },
  {
    name: "Leather Armor",
    type: "ARMOR",
    description: "Light leather armor that offers basic protection.",
    buyPrice: 300,
    sellPrice: 150,
    weight: 6,
    attack: 0,
    magicAttack: 0,
    defense: 10,
    magicDefense: 5,
    requiredLevel: 2,
    slot: 0,
    // Para armaduras, el slot suele ser "ARMOR".
    equipSlots: ["ARMOR"],
    script: "",
    isStackable: false,
    maxStack: 1,
    isTradable: true,
    isConsumable: false,
    element: "NEUTRAL",
    cardSlots: 0,
    sprite: "https://example.com/images/leather_armor.png"
  }
];
