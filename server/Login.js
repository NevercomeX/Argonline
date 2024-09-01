app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Verifica las credenciales
  if (isValidUser(username, password)) {
    res.json({ token: "user-token", charServer: "ws://char.server.com" });
  } else {
    res.status(401).json("Invalid credentials");
  }
});
