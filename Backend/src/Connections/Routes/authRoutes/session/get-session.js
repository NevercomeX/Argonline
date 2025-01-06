import express from "express";
import { authProtect } from "../utils/auth.js";

const router = express.Router();

// const USER = {
//   id: 1,
//   email: "test@demo.ltd",
//   fistName: "Joaquim",
//   lastName: "Das Couves",
//   bio: "Im a agricultor and i love to plant and take care of my plants.",
//   password: "123456",
// };

router.get("/", authProtect(), async (req, res) => {
  try {
    // DB QUERY
    const { id } = req.user;
    const client = await prisma.user.findUnique({
        where: { id: id },
        select: {
            id: true,
            email: true,
        },
    });

    // if the user is not found return false
    if (!client) {
        return res.json({ success: false });
    }

    return res.json({
      success: true,
      user: client
    });

    // return res.json({
    //   success: true,
    //   user: {
    //     id: USER.id,
    //     email: USER.email,
    //     firstName: USER.fistName,
    //     lastName: USER.lastName,
    //     bio: USER.bio,
    //   },
    // });
  } catch (err) {
    return res.json({
      success: false,
    });
  }
});

export default router;
