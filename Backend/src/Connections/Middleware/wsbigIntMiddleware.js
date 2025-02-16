// src/middleware/wsBigIntMiddleware.js

export function bigIntReplacer(key, value) {
  return typeof value === "bigint" ? value.toString() : value;
}

export function sendJson(ws, data) {
  try {
    const formattedData = JSON.stringify(data, bigIntReplacer);
    ws.send(formattedData);
  } catch (error) {
    console.error("❌ Error serializando JSON para WebSocket:", error);
  }
}
