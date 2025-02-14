// routes/combatRoutes.js
import { Router } from "express";
import { startBattle, getBattleStatus } from "../Controllers/Combat/combatController.js";

const router = Router();

router.post("/start-battle", startBattle);
router.get("/battle-status/:battleId", getBattleStatus);

export default router;
