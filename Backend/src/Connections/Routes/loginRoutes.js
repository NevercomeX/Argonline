import express from "express";

import registerUser from "./authRoutes/registerUser.js";
import adminRoute from "./authRoutes/users/admin.js";
import loginRoute from "./authRoutes/users/login.js";
import logoutRoute from "./authRoutes/users/logout.js";
import getUsers from "./authRoutes/users/users.js";
import getSession from "./authRoutes/session/get-session.js";
import refreshSession from "./authRoutes/session/refresh-session.js";
import verifySession from "./authRoutes/session/verify-session.js";

const router = express.Router();

router.use("/authV2/register", registerUser);
router.use("/authV2/admin", adminRoute);
router.use("/authV2/login", loginRoute);
router.use("/authV2/logout", logoutRoute);
router.use("/authV2/users", getUsers);
router.use("/authV2/get-session", getSession);
router.use("/authV2/refresh-session", refreshSession);
router.use("/authV2/verify-session", verifySession);

router.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Ruta no existe",
  });
});

export default router;