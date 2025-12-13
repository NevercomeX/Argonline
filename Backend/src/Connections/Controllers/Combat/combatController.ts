// combatController.js
import { prisma } from "../../../prismaClient/prismaClient";

export async function handleBattleAction(message: any, ws: any, battles: any) {
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

  let response: any = null;

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

async function handleAttack(battle: any, playerId: any, targetId: any) {
  const attacker = await prisma.character.findUnique({ where: { id: playerId } });
  const defender = await prisma.character.findUnique({ where: { id: targetId } });



  if (!attacker || !defender) {
    return { error: "Personaje no encontrado" };
  }

  const damage = Math.max(attacker.str - defender.vit, 1 ) ;
  defender.health -= damage;

  if (defender.health <= 0) {
    battle.winner = playerId;
  }

  await prisma.character.update({
    where: { id: targetId },
    data: { health: defender.health },
  });

  return { attacker: playerId, defender: targetId, damage };
}

async function handleDefend(battle: any, playerId: any) {
  // Aumenta defensa por el turno
  battle.defendingPlayers.add(playerId);
  return { playerId, action: "defend" };
}


export async function startBattle(req: any, res: any) {
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

export async function getBattleStatus(req: any, res: any) {
  const { battleId } = req.params;

  const battle = await prisma.battle.findUnique({ where: { id: Number(battleId) } });

  if (!battle) {
    return res.status(404).json({ error: "Batalla no encontrada" });
  }

  res.json(battle);
}
