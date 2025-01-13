import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "somethingsomething";

const authMiddleware = () => {
  return async (req, res, next) => {
    try {
      // Verifica si el encabezado Authorization está presente
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "No token provided. Unauthorized!",
        });
      }

      // Extrae el token
      const accessToken = authHeader.split(" ")[1];
      if (!accessToken) {
        return res.status(401).json({
          success: false,
          message: "Invalid token format. Unauthorized!",
        });
      }

      // Verifica el token
      jwt.verify(accessToken, JWT_SECRET, (err, decoded) => {
        if (err) {
          console.error("Token verification error:", err.message);
          return res.status(401).json({
            success: false,
            message: "Invalid or expired token. Unauthorized!",
          });
        }

        // Token válido, adjunta los datos al objeto `req`
        req.user = {
          id: decoded.id,
          email: decoded.email,
        };

        next(); // Continúa al siguiente middleware o controlador
      });
    } catch (error) {
      console.error("Middleware error:", error.message);
      res.status(500).json({
        success: false,
        message: "Internal server error. Please try again later.",
      });
    }
  };
};

export default authMiddleware;
