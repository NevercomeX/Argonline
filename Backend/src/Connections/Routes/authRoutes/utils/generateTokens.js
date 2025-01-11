import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import {prisma} from '../../../../Prisma/prismaClient.js';
import { v4 as uuid } from 'uuid';

const JWT_EXPIRES = 8000 * 5; // 5 minutes
const JWT_REFRESH_EXPIRES = 900 * 60 * 60; // 30 days
const SECRET = process.env.JWT_SECRET; // Secret for JWT

// Verify access token
const verifyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return false;
    }
};

// Calculate max age
const calculateMaxAge = (exp) => {
    const now = dayjs().unix();
    const maxAge = now + exp;
    return maxAge;
};

// Generate access token
const generateAccessToken = async ({ payload }) => {

    const token = jwt.sign(payload, SECRET, { expiresIn: JWT_EXPIRES });
    const maxAge = JWT_EXPIRES;

    return { token, maxAge };
};

// Generate refresh token
const generateRefreshToken = async ({ tokenId, userId }) => {

    try {
        // If the user has a refresh token, delete it
        if (tokenId) {
            await prisma.userSession.delete({ where: { id: tokenId } });
        }

        // get the session

        const createToken = await prisma.userSession.create({
            data: {
                id: uuid(),
                expiresAt: calculateMaxAge(JWT_REFRESH_EXPIRES),
                userId: userId,
                token: jwt.sign({ userId }, SECRET, { expiresIn: JWT_REFRESH_EXPIRES }),
            },
        });
        const token = createToken.id;
        const maxAge = JWT_REFRESH_EXPIRES;

        return { token, maxAge };
    } catch (err) {
        console.error(err);
    }
};

export {
    verifyToken,
    generateAccessToken,
    generateRefreshToken
};
