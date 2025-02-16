// combatController.js
import { prisma } from "../../../Prisma/prismaClient.js";

export async function handleBattleAction(message, ws, battles) {
  const { battleId, playerId, action, targetId } = message.payload;

  if (!battles.has(battleId)) {
    ws.send(JSON.stringify({ error: "Batalla no encontrada" }));
    return;
  }

  const battle = battles.get(battleId);

  if (battle.currentTurn !== playerId) {
    ws.send(JSON.stringify({ error: "No es tu turno" }));
    return;
  }

  let response;
  
  switch (action) {
    case "attack":
      response = await handleAttack(battle, playerId, targetId);
      break;
    case "defend":
      response = await handleDefend(battle, playerId);
      break;
    default:
      ws.send(JSON.stringify({ error: "Acción inválida" }));
      return;
  }

  battle.currentTurn = battle.currentTurn === battle.player1 ? battle.player2 : battle.player1;
  battles.set(battleId, battle);

  ws.send(JSON.stringify({ type: "battleUpdate", battle }));
}

async function handleAttack(battle, playerId, targetId) {
  const attacker = await prisma.character.findUnique({ where: { id: playerId } });
  const defender = await prisma.character.findUnique({ where: { id: targetId } });

  const damage = Math.max(attacker.str - defender.vit, 1);
  defender.hp -= damage;

  if (defender.hp <= 0) {
    battle.winner = playerId;
  }

  await prisma.character.update({
    where: { id: targetId },
    data: { hp: defender.hp },
  });

  return { attacker: playerId, defender: targetId, damage };
}

async function handleDefend(battle, playerId) {
  // Aumenta defensa por el turno
  battle.defendingPlayers.add(playerId);
  return { playerId, action: "defend" };
}


export async function startBattle(req, res) {
  const { player1, player2 } = req.body;

  const battle = await prisma.battle.create({
    data: {
      player1,
      player2,
      currentTurn: player1,
    },
  });

  res.json({ battleId: battle.id });
}

export async function getBattleStatus(req, res) {
  const { battleId } = req.params;

  const battle = await prisma.battle.findUnique({ where: { id: Number(battleId) } });

  if (!battle) {
    return res.status(404).json({ error: "Batalla no encontrada" });
  }

  res.json(battle);
}
