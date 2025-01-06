// verify-session.js
import express from 'express';
import { authProtect } from '../utils/auth.js';

const router = express.Router();

router.get('/', authProtect(), (req, res) => {
    return res.json({ success: true });
});

export default router;