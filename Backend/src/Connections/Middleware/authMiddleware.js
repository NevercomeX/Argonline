import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "somethingsomething";

export function authMiddleware(req, res, next) {
  const token = req.cookies.token; // Obtener el token de las cookies

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Adjuntar los datos del usuario al objeto de la solicitud
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
}
