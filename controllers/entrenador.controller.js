const db = require("../config/database");

// Crear entrenador
exports.createEntrenador = (req, res) => {
  const { nombre, apellido, telefono, correo, direccion } = req.body;
  const estado = 1; // por defecto activo

  if (!nombre || !apellido || !telefono || !correo || !direccion)
    return res.status(400).json({ error: "Todos los campos son obligatorios" });

  db.query(
    "INSERT INTO entrenador (nombre, apellido, telefono, correo, direccion, estado) VALUES (?, ?, ?, ?, ?, ?)",
    [nombre, apellido, telefono, correo, direccion, estado],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      res.status(201).json({ message: "Entrenador creado", id: result.insertId });
    }
  );
};


// Obtener todas las entrenadores
exports.getEntrenadores = (_req, res) => {
  db.query("SELECT * FROM entrenador", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(200).json(results);
  });
};

// Obtener entrenador por ID
exports.getEntrenadorById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM entrenador WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (results.length === 0) return res.status(404).json({ error: "Entrenador no encontrado" });

    res.status(200).json(results[0]);
  });
};

// Actualizar entrenador por ID
exports.updateEntrenador = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, telefono, correo, direccion, estado } = req.body;
  if (!nombre || !apellido || !telefono || !correo || !direccion || !estado) return res.status(400).json({ error: "Todos los campos son obligatorios" });

  db.query("UPDATE entrenador SET nombre = ?, apellido = ?, telefono = ?, correo = ?, direccion = ?, estado = ? WHERE id = ?", [nombre, apellido, telefono, correo, direccion, estado, id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Entrenador no encontrado" });

    res.status(200).json({ message: "Entrenador actualizado" });
  });
};

// Deshabilitar entrenador por ID
exports.deleteEntrenador = (req, res) => {
  const { id } = req.params;
  db.query("UPDATE entrenador SET estado = 0 WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Entrenador no encontrado" });

    res.status(200).json({ message: "Entrenador deshabilitado" });
  });
};

