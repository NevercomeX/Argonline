import express from "express";

import characterRoutes from "./gameRoutes/characterRoutes.js";
import itemRoutes from "./gameRoutes/itemRoutes.js";
import equipmentRoutes from "./gameRoutes/equipmentRoutes.js";
import inventoryRoutes from "./gameRoutes/inventoryRoutes.js";
import enemiesRoutes from "./gameRoutes/enemiesRoutes.js";
import userRouters from "./gameRoutes/userRouter.js";
import skillRoutes from "./gameRoutes/skillRoutes.js";
import stats from "./gameRoutes/statsRoutes.js";

const router = express.Router();

router.use("/skills", skillRoutes);
router.use("/users", userRouters);
router.use("/characters", characterRoutes);
router.use("/items", itemRoutes);
router.use("/equipment", equipmentRoutes);
router.use("/stats", stats);
// router.use("/item-instances", itemInstanceRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/mobs", enemiesRoutes);

router.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Ruta no existe",
  });
});

export default router;