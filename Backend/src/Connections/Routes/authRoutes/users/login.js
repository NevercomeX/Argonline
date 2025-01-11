import express from "express";
import { generateRefreshToken, generateAccessToken } from "../utils/generateTokens.js";
import { loginUser } from "../../../Controllers/index.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate user credentials
    const { user } = await loginUser(email, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Create token payload
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // Generate tokens
    const refreshToken = await generateRefreshToken({ userId: user.id });
    const accessToken = generateAccessToken({ payload });

    // Prepare cookies for client
    const cookies = {
      accessCookie: {
        value: accessToken.token,
        maxAge: accessToken.maxAge,
      },
      refreshCookie: {
        value: refreshToken.token,
        maxAge: refreshToken.maxAge,
      },
    };

    // Send response
    return res.status(200).json({
      success: true,
      cookies,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
});

export default router;
