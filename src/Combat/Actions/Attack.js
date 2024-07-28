import {updateCharacter} from "../../Controllers/character.js";

export async function attackPlayer(player, enemy) {
  let damage = player.attackPower - enemy.defense;
  enemy.health -= damage;
  // updatePlayerHealth(player, player.id, player.health);
  return damage;
}

export async function attackEnemy(player, enemy) {
  let damage = enemy.attackPower - player.defense;
  player.health -= damage;
  return damage;
}

export async function updatePlayerHealth( playerId, newHealth) {
  const playerData = await updateCharacter(playerId, { health: newHealth });
  return playerData;

}

export function physicalAttack(target) {
  let damage = this.attackPower - target.defense;
  if (damage < 0) damage = 0; // El daño no puede ser negativo
  // console.log(
  //   `${this.name} ataca físicamente a ${target.name} por ${damage} de daño.`
  // );
  console.log(" ");
  target.health -= damage;
  //vida restante
}

export function magicalAttack(target) {
  let damage = this.magicPower - target.magicDefense;
  if (damage < 0) damage = 0; // El daño no puede ser negativo
  console.log(
    `${this.name} ataca mágicamente a ${target.name} por ${damage} de daño.`
  );
  target.health -= damage;
}

export function defend(target) {
  this.isDefending = true;
  return;
}

// export function attack(target) {
//   if (this.attackType === "physical") {
//     this.physicalAttack(target);
//   } else if (this.attackType === "magical") {
//     this.magicalAttack(target);
//   }
// }
