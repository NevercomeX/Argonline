// src/Middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware para verificar token JWT
export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Acceso no autorizado: No se proporcionó el token' });
  }

  const token = authHeader.split(' ')[1]; // Obtener el token del encabezado Authorization

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado: Token faltante' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Guardar la información decodificada del usuario en `req.user`
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}
