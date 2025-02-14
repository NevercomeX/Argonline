import express from "express";

import combatStatsRoutes from "./gameRoutes/combatStatsRoutes.js";

const router = express.Router();

// Combat stats routes
router.use("/combat-stats", combatStatsRoutes);

router.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Ruta no existe",
  });
});

export default router;