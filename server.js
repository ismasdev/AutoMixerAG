const express = require("express");
const app = express();
const port = 3000;

let teams = []; // Almacenar teams temporalmente

//
app.use(express.json());

// Endpoint para recibir equipos
app.post("/teams", (req, res) => {
  const { teamName } = req.body;
  if (teamName) {
    teams.push(teamName);
    res.status(200).json({ message: "Equipo agregado exitosamente", teams });
  } else {
    res.status(400).json({ message: "El nombre del equipo es obligatorio" });
  }
});

// Endpoint para obtener la lista de equipos
app.get("/teams", (req, res) => {
  res.status(200).json({ teams });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
