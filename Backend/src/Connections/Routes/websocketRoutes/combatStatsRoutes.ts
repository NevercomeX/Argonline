// src/Connections/Routes/combatStatsRoutes.js
import express from "express";
import { calculateCombatStats } from "../../Controllers/Stats/statsCalculatorController";

const router: any = express.Router();

// Ejemplo: GET /combat-stats/:characterId
router.get("/:characterId", async (req: any, res: any) => {
    try {
        const stats = await calculateCombatStats(req.params.characterId);
        res.json(stats);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router as any;
