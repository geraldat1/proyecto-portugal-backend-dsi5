const db = require("../config/database");

// Crear un nuevo rutina_plan
exports.createRutinaplan = (req, res) => {
  const { id_plan, id_rutina, estado } = req.body;

  if (!id_plan || !id_rutina) {
    return res.status(400).json({ error: "id_plan e id_rutina son obligatorios" });
  }

  const sql = `
    INSERT INTO rutina_plan (id_plan, id_rutina, estado)
    VALUES (?, ?, ?)
  `;
  const values = [id_plan, id_rutina, estado ?? 1];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error al crear el rutina_plan:", err);
      return res.status(500).json({ error: "Error al crear el rutina_plan" });
    }

    res.status(201).json({ message: "rutina_plan creado", id: result.insertId });
  });
};

// Obtener todos los rutina_plan
exports.getRutinaplanes = (_req, res) => {
  db.query("SELECT * FROM rutina_plan", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener los rutina_plan" });
    res.status(200).json(results);
  });
};

// Obtener rutina_plan por ID
exports.getRutinaplanById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM rutina_plan WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (results.length === 0) return res.status(404).json({ error: "rutina_plan no encontrado" });

    res.status(200).json(results[0]);
  });
};

// Actualizar rutina_plan por ID
exports.updateRutinaplan = (req, res) => {
  const { id } = req.params;
  const { id_plan, id_rutina, estado } = req.body;

  if (!id_plan || !id_rutina) {
    return res.status(400).json({ error: "id_plan e id_rutina son obligatorios" });
  }

  db.query(
    "UPDATE rutina_plan SET id_plan = ?, id_rutina = ?, estado = ? WHERE id = ?",
    [id_plan, id_rutina, estado ?? 1, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error al actualizar el rutina_plan" });
      if (result.affectedRows === 0) return res.status(404).json({ error: "rutina_plan no encontrado" });

      res.status(200).json({ message: "rutina_plan actualizado correctamente" });
    }
  );
};

// Eliminar rutina_plan por ID
exports.deleteRutinaplan = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM rutina_plan WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error al eliminar el rutina_plan" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "rutina_plan no encontrado" });

    res.status(200).json({ message: "rutina_plan eliminado correctamente" });
  });
};
