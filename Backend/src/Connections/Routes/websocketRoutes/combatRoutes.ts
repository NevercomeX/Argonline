// routes/combatRoutes.js
import { Router } from "express";
import { startBattle, getBattleStatus } from "../../Controllers/Combat/combatController";

const router: any = Router();

router.post("/start-battle", startBattle);
router.get("/battle-status/:battleId", getBattleStatus);

export default router as any;
