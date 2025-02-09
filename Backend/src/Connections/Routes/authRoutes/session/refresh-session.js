import express from "express";
import dayjs from "dayjs";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";

const router = express.Router();


router.get("/", async (req, res) => {
  const refreshToken = req.headers["x-refresh-token"];

  // if no refresh token is provided return false
  if (!refreshToken) {
    return res.json({
      success: false,
    });
  }

  try {
    // DB QUERY
    const decoded = await prisma.Usersession.findUnique({
        where: { id: refreshToken },
        select: {
            id: true,
            expires: true,
            user: {
                select: {
                    id: true,
                    email: true,
                },
            },
        },
    });

    // if the token is not found in the db do not refresh the session
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // check if the token is expired
    const now = dayjs().unix();
    const isExpired = now > decoded.expires;

    // if the token is expired do not refresh the session
    if (isExpired) {
      return res.status(401).json({ success: false, message: "Token expired" });
    }

    // If refresh token is valid create the payload
    const payload = {
      id: decoded.user.id,
      email: decoded.user.email,
    };

    // generate refresh tokens
    const refresh = await generateRefreshToken({
      tokenId: decoded.id,
      userId: decoded.user.id,
    });

    // generate access token
    const access = await generateAccessToken({ payload: payload });

    // send the cookies to the client
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
  } catch (err) {
    return res.json({
      success: false,
    });
  }
});

export default router;
