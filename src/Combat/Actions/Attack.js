import { updateCharacter } from "../../Controllers/character.js";

export async function attackPlayer(player, enemy) {
  let damage = player.attackPower - enemy.defense;
  if (damage < 0) damage = 0; // El daño no puede ser negativo
  enemy.health -= damage;
  return damage;
}

export async function attackEnemy(player, enemy) {
  let damage = enemy.attackPower - player.defense;
  if (damage < 0) damage = 0; // El daño no puede ser negativo
  player.health -= damage;
  await updatePlayerHealth(player.id, player.health); // Actualiza la salud del jugador en la base de datos
  return damage;
}

export async function updatePlayerHealth(playerId, newHealth) {
  const playerData = await updateCharacter(playerId, { health: newHealth });
  return playerData;
}

export function physicalAttack(target) {
  let damage = this.attackPower - target.defense;
  if (damage < 0) damage = 0; // El daño no puede ser negativo
  target.health -= damage;
  console.log(
    `${this.name} ataca físicamente a ${target.name} por ${damage} de daño.`,
  );
}

export function magicalAttack(target) {
  let damage = this.magicPower - target.magicDefense;
  if (damage < 0) damage = 0; // El daño no puede ser negativo
  target.health -= damage;
  console.log(
    `${this.name} ataca mágicamente a ${target.name} por ${damage} de daño.`,
  );
}

export function defend(target) {
  this.isDefending = true;
}
