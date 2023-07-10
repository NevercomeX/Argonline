const swordMasterySkill = {
  name: "Sword Mastery",
  description: "Increases ATK by 4~40 with swords and daggers.",
  type: "Passive",
  weaponType: ["Sword", "Dagger"],
  attackIncrease: {
    min: 4,
    max: 40,
  },
};

const twoHandedSwordMasterySkill = {
  name: "Two-Handed Sword Mastery",
  description: "Increases ATK by 4~40 with two-handed swords.",
  type: "Passive",
  weaponType: ["Two-Handed Sword"],
  attackIncrease: {
    min: 4,
    max: 40,
  },
};

const increaseHPRecoverySkill = {
  name: "Increase HP Recovery",
  description:
    "Increases HP Recovery while not moving. Also increases efficiency of Healing Items (HP) and Alchemist's Aid Potion by 10~100%.",
  type: "Passive",
  hpRecoveryIncrease: {
    min: 10,
    max: 100,
  },
  itemEfficiencyIncrease: {
    min: 10,
    max: 100,
  },
};

const passiveSkills = [
  swordMasterySkill,
  twoHandedSwordMasterySkill,
  increaseHPRecoverySkill,
];

export default passiveSkills;
