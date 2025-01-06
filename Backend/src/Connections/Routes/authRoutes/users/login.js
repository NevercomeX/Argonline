import express from "express";
import { generateRefreshToken, generateAccessToken } from "../utils/auth.js";

const router = express.Router();

// SWAP THIS DATA WITH A DATABASE QUERY
const USER = {
  id: 1,
  email: "test@demo.ltd",
  password: "123456",
};

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password are required",
    });
  }

  // SWAP THIS WITH A DATABASE QUERY
  if (email !== USER.email || password !== USER.password) {
    return res.json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // SWAP THIS WITH A DATABASE QUERY
  const payload = {
    id: USER.id,
    email: USER.email,
  };

  // generate access and refresh tokens
  const refresh = await generateRefreshToken({ userId: USER.id });
  const access = await generateAccessToken({ payload });

  // sent the cookies to the client
  const cookies = {
    accessCookie: {
      value: access.token,
      maxAge: access.maxAge,
    },
    refreshCookie: {
      value: refresh.token,
      maxAge: refresh.maxAge,
    },
  };

  return res.json({
    success: true,
    cookies,
  });
});

export default router;
