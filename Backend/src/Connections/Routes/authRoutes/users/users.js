import express from 'express';
import { authProtect } from '../utils/auth.js';

const router = express.Router();

router.get('/', authProtect(), (req, res) => {
    const users = [
        { name: 'John', age: 25 },
        { name: 'Jane', age: 30 },
        { name: 'Bob', age: 35 },
        { name: 'Alice', age: 40 },
        { name: 'Eve', age: 45 },
        { name: 'Mallory', age: 50 },
    ];
    return res.json({
        users,
    });
});

export default router;
