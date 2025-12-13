import express from "express";

import registerUser from "./authRoutes/registerUser";
import adminRoute from "./authRoutes/users/admin";
import loginRoute from "./authRoutes/users/login";
import logoutRoute from "./authRoutes/users/logout";
import getUsers from "./authRoutes/users/users";
import getSession from "./authRoutes/session/get-session";
import refreshSession from "./authRoutes/session/refresh-session";
import verifySession from "./authRoutes/session/verify-session";

const router: any = express.Router();

router.use("/authV2/register", registerUser);
router.use("/authV2/admin", adminRoute);
router.use("/authV2/login", loginRoute);
router.use("/authV2/logout", logoutRoute);
router.use("/authV2/users", getUsers);
router.use("/authV2/get-session", getSession);
router.use("/authV2/refresh-session", refreshSession);
router.use("/authV2/verify-session", verifySession);

router.use((req: any, res: any, next: any) => {
  res.status(404).json({
    success: false,
    message: "Ruta no existe",
  });
});

export default router;