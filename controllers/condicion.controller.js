const db = require("../config/database");

// Crear condicion
exports.createCondicion = (req, res) => {
  const { nombre } = req.body;

  // Validación de campos obligatorios
  if (!nombre) {
    return res.status(400).json({ error: "El campo nombre es obligatorio" });
  }

  // Verificar si ya existe una condición con ese nombre
  db.query("SELECT * FROM condicion WHERE nombre = ?", [nombre], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });

    if (results.length > 0) {
      return res.status(400).json({ error: "La condición con ese nombre ya existe" });
    }

    db.query(
      "INSERT INTO condicion (nombre) VALUES (?)",
      [nombre],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Error en la base de datos" });

        res.status(201).json({ message: "Condición creada", id: result.insertId });
      }
    );
  });
};

// Obtener todas las condiciones
exports.getCondiciones = (_req, res) => {
  db.query("SELECT * FROM condicion", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(200).json(results);
  });
};

// Obtener condición por ID
exports.getCondicionById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM condicion WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (results.length === 0) return res.status(404).json({ error: "Condición no encontrada" });

    res.status(200).json(results[0]);
  });
};

// Actualizar condición por ID
exports.updateCondicion = (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "El campo nombre es obligatorio" });
  }

  db.query(
    "UPDATE condicion SET nombre = ? WHERE id = ?",
    [nombre, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Condición no encontrada" });

      res.status(200).json({ message: "Condición actualizada" });
    }
  );
};

// Eliminar condición por ID (deshabilitar)
exports.deleteCondicion = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM condicion WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Condición no encontrada" });

    res.status(200).json({ message: "Condición eliminada correctamente" });
  });
};
