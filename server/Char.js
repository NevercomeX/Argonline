// HTTP para carga inicial de datos del personaje
app.get("/character/:id", async (req, res) => {
  const character = await getCharacterById(req.params.id);
  res.json(character);
});

// WebSocket para actualizaciones en tiempo real
ws.on("message", (message) => {
  const data = JSON.parse(message);
  if (data.type === "updateStat") {
    updateCharacterStat(data.characterId, data.stat, data.value);
  }
});
