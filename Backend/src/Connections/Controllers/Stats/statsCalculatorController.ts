import { prisma } from "../../../prismaClient/prismaClient";
import redisClient from  "../../../redisClient";
/**
 * Calcula y actualiza las estadísticas de combate de un personaje.
 *
 * @param {number|string} characterId - ID del personaje
 * @returns {Promise<Object>} - Objeto con las estadísticas finales
 */
export async function calculateCombatStats(characterId: any) {
  if (!characterId) {
    throw new Error("Character ID is required.");
  }

  const charId = Number(characterId);
  const cacheKey = `combatStats:${charId}`;

  // Eliminar caché previo
  await redisClient.del(cacheKey);

  // Obtener los atributos base del personaje
  const character = await prisma.character.findUnique({
    where: { id: charId },
    select: {
      str: true,
      agi: true,
      vit: true,
      int: true,
      dex: true,
      luk: true,
    },
  });

  if (!character) {
    throw new Error("Character not found.");
  }

  // Obtener los ítems equipados
  const equipmentItems = await prisma.equipmentItem.findMany({
    where: { characterId: charId },
    include: {
      item: true,
    },
  });

  let totalStr = character.str;
  let totalAgi = character.agi;
  let totalVit = character.vit;
  let totalInt = character.int;
  let totalDex = character.dex;
  let totalLuk = character.luk;

  // Sumar modificadores de los ítems equipados
  equipmentItems.forEach((eq: any) => {
    if (eq.item) {
      totalStr += eq.item.attack || 0;
      totalAgi += eq.item.magicAttack || 0;
      totalVit += eq.item.defense || 0;
      totalInt += eq.item.magicDefense || 0;
      totalDex += eq.item.accuracy || 0;
      totalLuk += eq.item.evasion || 0;
    }
  });

  const combatStats = {
    totalStr,
    totalAgi,
    totalVit,
    totalInt,
    totalDex,
    totalLuk,
  };

  // Guardar en caché con expiración de 60 segundos
  await redisClient.set(cacheKey, JSON.stringify(combatStats), { EX: 60 });

  return combatStats;
}

/**
 * Maneja la solicitud WebSocket para calcular estadísticas de combate.
 *
 * @param {WebSocket} ws - Conexión WebSocket
 * @param {Object} message - Mensaje recibido en formato JSON
 */
export async function handleCombatStatsRequest(ws: any, message: any) {
  try {
    const { characterId } = message.payload;

    if (!characterId) {
      return ws.send(JSON.stringify({ error: "Character ID is required" }));
    }

    const stats = await calculateStats(characterId);

    ws.send(JSON.stringify({
      type: "combatStats",
      characterId,
      stats,
    }));

  } catch (error) {
    console.error("Error calculating combat stats:", error);
    ws.send(JSON.stringify({ error: error}));
  }
}

const calculateStats = async (charId: any) => {
  const character = await prisma.character.findUnique({
    where: { id: charId },
  });

  if (!character) {
    throw new Error("Character not found");
  }

  const equipmentItems = await prisma.equipmentItem.findMany({
    where: { characterId: charId },
    include: { item: true },
  });

  // 📌 Stats Base del personaje
  console.log(character);
  let {health, maxHealth, maxMana, mana, str, agi, vit, int, dex, luk, baseLevel } = character;

  // 📌 Bonos por equipo
  let equipAtk = 0, equipMatk = 0, equipDef = 0, equipMdef = 0, equipHealth = 0, equipMana = 0;
  let equipHit = 0, equipFlee = 0, equipCrit = 0, equipAspd = 0, equipMaxHealth = 0, equipMaxMana = 0;

  // 🔹 Procesar cada equipo equipado
  equipmentItems.forEach(({ item }: any) => {
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

  console.log({MAXHP,MAXSP,HP, SP, ATK, MATK, DEF, MDEF, HIT, FLEE, CRIT, ASPD });

  return {MAXHP,MAXSP,HP, SP, ATK, MATK, DEF, MDEF, HIT, FLEE, CRIT, ASPD };
};

const calculateAspd = (job: any, agi: any, dex: any, equipAspd: any) => {
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
