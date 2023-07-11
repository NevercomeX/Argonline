import Enemy from "./Enemy.js";

export default function generateEnemy() {
  // Define los nombres, estadísticas y botín posibles
  const names = ["Goblin", "Orc", "Troll"];
  const healthValues = [100, 200, 300];
  const attackPowerValues = [20, 30, 40];
  const defenseValues = [10, 20, 30];
  const magicDefenseValues = [5, 10, 15];
  const lootOptions = [
    { name: "Health Potion", dropChance: 0.5 },
    { name: "Mana Potion", dropChance: 0.3 },
    { name: "Sword", dropChance: 0.1 },
  ];

  // Elige un nombre, estadísticas y botín aleatorios
  const name = names[Math.floor(Math.random() * names.length)];
  const health = healthValues[Math.floor(Math.random() * healthValues.length)];
  const attackPower =
    attackPowerValues[Math.floor(Math.random() * attackPowerValues.length)];
  const defense =
    defenseValues[Math.floor(Math.random() * defenseValues.length)];
  const magicDefense =
    magicDefenseValues[Math.floor(Math.random() * magicDefenseValues.length)];
  const loot = [lootOptions[Math.floor(Math.random() * lootOptions.length)]];

  // Crea y devuelve un nuevo enemigo con las estadísticas y botín elegidos
  return new Enemy(
    name,
    health,
    attackPower,
    defense,
    magicDefense,
    "physical",
    loot
  );
}
