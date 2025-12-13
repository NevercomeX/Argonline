// src/Connections/Routes/combatStatsRoutes.js
import express from "express";
import { calculateCombatStats } from "../../Controllers/Stats/statsCalculatorController";

const router = express.Router();

// Ejemplo: GET /combat-stats/:characterId
router.get("/:characterId", async (req, res) => {
    try {
        const stats = await calculateCombatStats(req.params.characterId);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
});

export default router;
