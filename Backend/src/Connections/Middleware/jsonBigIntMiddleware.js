// src/Middleware/jsonBigIntMiddleware.js
export default function jsonBigIntMiddleware(req, res, next) {
  // Guarda la implementación original de res.json
  const originalJson = res.json.bind(res);

  // Sobrescribe res.json
  res.json = function (data) {
    // Serializa los datos usando un replacer que convierte BigInt a string
    const json = JSON.stringify(data, (key, value) => {
      return typeof value === "bigint" ? value.toString() : value;
    });
    // Establece el Content-Type y envía la respuesta serializada
    res.setHeader("Content-Type", "application/json");
    return res.send(json);
  };

  next();
}
