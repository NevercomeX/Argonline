import express from 'express';
import { authProtect } from '../utils/auth.js';

const router = express.Router();

router.get('/', authProtect(), (req, res) => {
    res.send('This route is protected');
});

export default router;
