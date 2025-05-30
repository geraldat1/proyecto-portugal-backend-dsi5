const db = require("../config/database");

// Crear rutina
exports.createRutina = (req, res) => {
  const { dia, descripcion } = req.body;
  const id_user = req.user?.id; // Suponiendo que el middleware de autenticación agrega el usuario aquí
  const estado = 1; // Siempre activo por defecto

  if (!dia || !descripcion || !id_user) {
    return res.status(400).json({ error: "Día, descripción y usuario son obligatorios" });
  }

  db.query(
    "INSERT INTO rutinas (dia, descripcion, id_user, estado) VALUES (?, ?, ?, ?)",
    [dia, descripcion, id_user, estado],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      res.status(201).json({ message: "Rutina creada", id: result.insertId });
    }
  );
};


// Obtener todas las rutinas
exports.getRutinas = (_req, res) => {
  db.query("SELECT * FROM rutinas", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(200).json(results);
  });
};

// Obtener rutina por ID
exports.getRutinaById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM rutinas WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (results.length === 0) return res.status(404).json({ error: "Rutina no encontrada" });

    res.status(200).json(results[0]);
  });
};

// Actualizar rutina por ID
exports.updateRutina = (req, res) => {
  const { id } = req.params;
  const { dia, descripcion, id_user, estado } = req.body;
  if (!dia || !descripcion || !id_user || !estado) return res.status(400).json({ error: "Todos los campos son obligatorios" });

  db.query("UPDATE rutinas SET dia = ?, descripcion = ?, id_user = ?, estado = ? WHERE id = ?", [dia, descripcion, id_user, estado, id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Rutina no encontrada" });

    res.status(200).json({ message: "Rutina actualizada" });
  });
};

// Desactivar rutina por ID (cambiar estado a 0)
exports.deleteRutina = (req, res) => {
  const { id } = req.params;
  db.query("UPDATE rutinas SET estado = 0 WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Rutina no encontrada" });

    res.status(200).json({ message: "Rutina desactivada" });
  });
};

