const db = require("../config/database");

// Crear Asistencia
exports.createAsistencia = (req, res) => {
  const { fecha, hora_entrada, hora_salida, id_cliente, id_entrenador, id_usuario, estado } = req.body;
  if (!fecha || !hora_entrada || !hora_salida || !id_cliente || !id_entrenador || !id_usuario || !estado) return res.status(400).json({ error: "Todos los campos son obligatorios" });

  db.query("INSERT INTO asistencias (fecha, hora_entrada, hora_salida, id_cliente, id_entrenador, id_usuario, estado) VALUES (?, ?, ?, ?, ?, ?, ?)", [fecha, hora_entrada, hora_salida, id_cliente, id_entrenador, id_usuario, estado], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(201).json({ message: "Asistencia creada", id: result.insertId });
  });
};

// Obtener todas las asistencias
exports.getAsistencias = (_req, res) => {
  db.query("SELECT * FROM asistencias", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(200).json(results);
  });
};

// Obtener asistencia por ID
exports.getAsistenciaById = (req, res) => {
  const { id_asistencia } = req.params;
  db.query("SELECT * FROM asistencias WHERE id_asistencia = ?", [id_asistencia], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (results.length === 0) return res.status(404).json({ error: "Asistencia no encontrada" });

    res.status(200).json(results[0]);
  });
};

// Actualizar asistencia por ID
exports.updateAsistencia = (req, res) => {
  const { id_asistencia } = req.params;
  const { fecha, hora_entrada, hora_salida, id_cliente, id_entrenador, id_usuario, estado } = req.body;
  if (!fecha || !hora_entrada || !hora_salida || !id_cliente || !id_entrenador || !id_usuario || !estado) return res.status(400).json({ error: "Todos los campos son obligatorios" });

  db.query("UPDATE asistencias SET fecha = ?, hora_entrada = ?, hora_salida = ?, id_cliente = ?, id_entrenador = ?, id_usuario = ?, estado = ? WHERE id_asistencia = ?", [fecha, hora_entrada, hora_salida, id_cliente, id_entrenador, id_usuario, estado, id_asistencia], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Asistencia no encontrada" });

    res.status(200).json({ message: "Asistencia actualizada" });
  });
};

// Eliminar asistencia por ID
exports.deleteAsistencia = (req, res) => {
  const { id_asistencia } = req.params;
  db.query("DELETE FROM asistencias WHERE id_asistencia = ?", [id_asistencia], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Asistencia no encontrada" });

    res.status(200).json({ message: "Asistencia eliminada" });
  });
};
