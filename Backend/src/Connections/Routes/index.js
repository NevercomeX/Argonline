import express from "express";

import { getRoutes } from "../Middleware/getRoutes.js";

import characterRoutes from "./gameRoutes/characterRoutes.js";
import itemRoutes from "./gameRoutes/itemRoutes.js";
import equipmentRoutes from "./gameRoutes/equipmentRoutes.js";
import inventoryRoutes from "./gameRoutes/inventoryRoutes.js";
import itemInstanceRoutes from "./gameRoutes/itemInstanceRoutes.js";
import enemiesRoutes from "./gameRoutes/enemiesRoutes.js"
import userRouters from "./gameRoutes/userRouter.js";


import authRouter from "./authRoutes/authRouter.js";
import adminRoute from "./authRoutes/users/admin.js";
import loginRoute from "./authRoutes/users/login.js";
import getUsers from "./authRoutes/users/users.js";
import getSession from "./authRoutes/session/get-session.js";
import refreshSession from "./authRoutes/session/refresh-session.js";
import verifySession from "./authRoutes/session/verify-session.js";


const router = express.Router();

// Routes para los diferentes recursos de usuarios
router.use("/users", userRouters);

router.use("/auth", authRouter);
router.use("/admin", adminRoute);
router.use("/login", loginRoute);
router.use("/users", getUsers);
router.use("/auth/get-session", getSession);
router.use("/auth/refresh-session", refreshSession);
router.use("/auth/verify-session", verifySession);



// Rutas para los diferentes recursos de juegos
router.use("/characters", characterRoutes);
router.use("/items", itemRoutes);
router.use("/item-instances", itemInstanceRoutes);
router.use("/equipment", equipmentRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/mobs",enemiesRoutes)


router.get("/routes", (req, res) => {
    const routes = getRoutes(router); // Obtenemos todas las rutas registradas
    res.json(routes); // Devolvemos las rutas en formato JSON
  });
  

export default router;
