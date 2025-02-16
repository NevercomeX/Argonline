// src/Connections/Routes/combatStatsRoutes.js
import express from "express";
import { getCombatStatsController } from "../../Controllers/Stats/statsCalculatorController.js";

const router = express.Router();

// Ejemplo: GET /combat-stats/:characterId
router.get("/:characterId", getCombatStatsController);

export default router;
