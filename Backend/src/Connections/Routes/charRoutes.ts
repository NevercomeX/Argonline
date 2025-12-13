import express from "express";

import characterRoutes from "./gameRoutes/characterRoutes";
import itemRoutes from "./gameRoutes/itemRoutes";
import equipmentRoutes from "./gameRoutes/equipmentRoutes";
import inventoryRoutes from "./gameRoutes/inventoryRoutes";
// import itemInstanceRoutes from "./gameRoutes/itemInstanceRoutes";
import enemiesRoutes from "./gameRoutes/enemiesRoutes";
import userRouters from "./gameRoutes/userRouter";
import skillRoutes from "./gameRoutes/skillRoutes";

const router: express.Router = express.Router();

router.use("/skills", skillRoutes);
router.use("/users", userRouters);
router.use("/characters", characterRoutes);
router.use("/items", itemRoutes);
router.use("/equipment", equipmentRoutes);
// router.use("/item-instances", itemInstanceRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/mobs", enemiesRoutes);

router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Ruta no existe",
  });
});

export default router;