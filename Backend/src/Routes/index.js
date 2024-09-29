import express from "express";
import { getRoutes } from "../Middleware/getRoutes.js";
import characterRoutes from "./characterRoutes.js";
import itemRoutes from "./itemRoutes.js"; // Importa las nuevas rutas
import equipmentRoutes from "./equipmentRoutes.js";
import inventoryRoutes from "./inventoryRoutes.js";
import itemInstanceRoutes from "./itemInstanceRoutes.js";
import enemiesRoutes from "./enemiesRoutes.js"
import userRouters from "./userRouter.js";
import authRouter from "./authRouter.js";


const router = express.Router();

// Monta las rutas
router.use("/characters", characterRoutes);
router.use("/items", itemRoutes);
router.use("/item-instances", itemInstanceRoutes);
router.use("/equipment", equipmentRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/mobs",enemiesRoutes)
router.use("/users", userRouters);
router.use("/auth", authRouter);

router.get("/routes", (req, res) => {
    const routes = getRoutes(router); // Obtenemos todas las rutas registradas
    res.json(routes); // Devolvemos las rutas en formato JSON
  });
  

export default router;
