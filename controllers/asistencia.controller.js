const db = require("../config/database");

// Crear Asistencia
exports.createAsistencia = (req, res) => {
  const { id_cliente, id_entrenador, id_rutina } = req.body;

  // Validar campos obligatorios
  if (!id_cliente || !id_entrenador || !id_rutina) {
    return res.status(400).json({ error: "id_cliente, id_entrenador e id_rutina son obligatorios" });
  }

  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  const fecha = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const hora_entrada = new Date().toTimeString().slice(0, 8); // HH:mm:ss
  const hora_salida = null;
  const id_usuario = req.user.id;
  const estado = 1;

  const sql = `
    INSERT INTO asistencias (fecha, hora_entrada, hora_salida, id_cliente, id_entrenador, id_rutina, id_usuario, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [fecha, hora_entrada, hora_salida, id_cliente, id_entrenador, id_rutina, id_usuario, estado];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error en la base de datos:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }

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
  
  // Obtener la fecha actual y la hora de salida
  const fecha = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const hora_salida = new Date().toTimeString().slice(0, 8); // HH:mm:ss
  const id_usuario = req.user.id; // Obtener el id del usuario autenticado
  const estado = 0; // Estado cambiado a 0
  
  // Obtener los datos enviados en el cuerpo de la solicitud
  const { hora_entrada, id_cliente, id_entrenador } = req.body;

  // Validar campos obligatorios
  if (!hora_entrada || !id_cliente || !id_entrenador) {
    return res.status(400).json({ error: "hora_entrada, id_cliente, y id_entrenador son obligatorios" });
  }

  // Consultar la base de datos para actualizar la asistencia
  db.query(
    "UPDATE asistencias SET fecha = ?, hora_entrada = ?, hora_salida = ?, id_cliente = ?, id_entrenador = ?, id_usuario = ?, estado = ? WHERE id_asistencia = ?",
    [fecha, hora_entrada, hora_salida, id_cliente, id_entrenador, id_usuario, estado, id_asistencia],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Asistencia no encontrada" });

      res.status(200).json({ message: "Asistencia actualizada" });
    }
  );
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
