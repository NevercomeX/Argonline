const increaseAttackSkill = {
  name: "Increase Attack",
  description:
    "Increases a target's ATK by 5~32% and decreases its DEF by 10~55% with a 53~80% success chance.",
  type: "Buff",
  successChance: {
    min: 53,
    max: 80,
  },
  attackIncrease: {
    min: 5,
    max: 32,
  },
  defenseDecrease: {
    min: 10,
    max: 55,
  },
};

export default increaseAttackSkill;
