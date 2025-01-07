import express from "express";
import { generateRefreshToken, generateAccessToken } from "../utils/auth.js";
import { loginUser} from "../../../Controllers/index.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  console.log("Datos recibidos:", email, password);

  try {
    // Llamada al controlador para validar las credenciales del usuario
    const {token, user} = await loginUser(email, password);

    console.log("===========login.js=============")
    console.log("Usuario encontrado:", user);
    console.log("Token generado:", token);


    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas." });
    }

    // Crear el payload para los tokens
    const payload = {
      id: user.id,
      email: user.email,
    };

    console.log("Payload:", payload);

    // Generar tokens

    const refresh = await generateRefreshToken({ userId: user.id});
    const access = await generateAccessToken({ payload });
  
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

  } catch (error) {
    console.error("Error en el login:", error.message);
    return res.status(500).json({ error: "Error en el servidor. Intente nuevamente." });
  }
});

export default router;
