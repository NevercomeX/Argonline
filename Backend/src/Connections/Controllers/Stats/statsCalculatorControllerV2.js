import { prisma } from "../../../Prisma/prismaClient.js";
import redisClient from "../../../redisClient.js";

/**
 * Calcula y actualiza las estadísticas de combate de un personaje.
 *
 * @param {number|string} characterId - ID del personaje
 * @returns {Promise<Object>} - Objeto con las estadísticas finales
 */
export async function calculateCombatStats(characterId) {
  
  if (!characterId) {
    throw new Error("Character ID is required.");
  }
  const charId = Number(characterId);

  // const cacheKey = `combatStats:${charId}`;
  const combatStats = await calculateStats(charId);

  // Eliminar caché previo
  // await redisClient.del(cacheKey);

  // Guardar en caché con expiración de 60 segundos
  // await redisClient.set(cacheKey, JSON.stringify(combatStats), { EX: 60 });

  return combatStats;
}

const calculateStats = async (charId) => {
  const character = await prisma.character.findUnique({
    where: { id: charId },
  });

  const equipmentItems = await prisma.equipmentItem.findMany({
    where: { characterId: charId },
    include: { item: true },
  });

  // 📌 Stats Base del personaje
  let {health, maxHealth, maxMana, mana, str, agi, vit, int, dex, luk, baseLevel } = character;

  // 📌 Bonos por equipo
  let equipAtk = 0, equipMatk = 0, equipDef = 0, equipMdef = 0, equipHealth = 0, equipMana = 0;
  let equipHit = 0, equipFlee = 0, equipCrit = 0, equipAspd = 0, equipMaxHealth = 0, equipMaxMana = 0;

  // 🔹 Procesar cada equipo equipado
  equipmentItems.forEach(({ item }) => {
    if (item) {
      equipHealth += item.health || 0;
      equipMana += item.mana || 0;
      equipMaxHealth += item.maxHealth || 0;
      equipMaxMana += item.maxMana || 0;
      equipAtk += item.attack || 0;
      equipMatk += item.magicAttack || 0;
      equipDef += item.defense || 0;
      equipMdef += item.magicDefense || 0;
      equipHit += item.accuracy || 0;
      equipFlee += item.evasion || 0;
      equipCrit += item.crit || 0;
      equipAspd += item.attackSpeed || 0;
    }
  });

  // 📌 Cálculo de stats finales según Ragnarok Online
  const HP = health;
  const SP = mana;
  const MAXHP = maxHealth + vit * 35 + equipHealth + equipMaxHealth;
  const MAXSP = maxMana + int * 6 + equipMana + equipMaxMana;
  const ATK = str + Math.floor(dex / 5) + equipAtk;
  const MATK = int + Math.floor(dex / 5) + equipMatk;
  const DEF = vit + equipDef + Math.floor(str / 5);
  const MDEF = int + equipMdef + Math.floor(vit / 5); 
  const HIT = dex + baseLevel + equipHit;
  const FLEE = agi + baseLevel + equipFlee;
  const CRIT = Math.floor(luk / 2) + equipCrit;
  const ASPD = Math.floor(calculateAspd(character.jobclass, agi, dex, equipAspd));

  return {MAXHP,MAXSP,HP, SP, ATK, MATK, DEF, MDEF, HIT, FLEE, CRIT, ASPD };
};

const calculateAspd = (job, agi, dex, equipAspd) => {
  let baseAspd = 140; // Base estándar

  if (job === "Knight") baseAspd = 145;
  if (job === "Assassin") baseAspd = 150;
  if (job === "Hunter") baseAspd = 142;
  if (job === "Priest") baseAspd = 135;
  if (job === "Wizard") baseAspd = 135;
  if (job === "Blacksmith") baseAspd = 140;
  if (job === "Monk") baseAspd = 140;
  if (job === "Crusader") baseAspd = 135;
  if (job === "Rogue") baseAspd = 150;
  if (job === "Bard") baseAspd = 140;
  if (job === "Dancer") baseAspd = 140;
  if (job === "Sage") baseAspd = 135;
  if (job === "Alchemist") baseAspd = 145;
  if (job === "Star Gladiator") baseAspd = 140;
  if (job === "Soul Linker") baseAspd = 140;
  if (job === "Ninja") baseAspd = 150;
  if (job === "Gunslinger") baseAspd = 150;
  if (job === "Super Novice") baseAspd = 140;
  if (job === "Taekwon") baseAspd = 140;
  

  return baseAspd + (agi + dex) / 4 + equipAspd;
};
