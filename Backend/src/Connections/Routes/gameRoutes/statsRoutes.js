// src/Connections/Routes/combatStatsRoutes.js
import express from "express";
import { calculateCombatStats } from "../../Controllers/index.js";

const router = express.Router();

// Endpoint GET /combat-stats/:characterId
router.get("/:characterId", async (req, res) => {
  const characterId = req.params.characterId;
  try {
    const combatStats = await calculateCombatStats(characterId);
    res.status(200).json(combatStats);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las estadísticas de combate" });
  }
} );

export default router;
