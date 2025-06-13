const db = require("../config/database");

// Crear Asistencia
exports.createAsistencia = (req, res) => {
  const { id_detalle, id_entrenador } = req.body;

  // Validación modificada para permitir id_entrenador = 0
if (!id_detalle || id_entrenador === undefined) {
  return res.status(400).json({
    error: "Datos incompletos",
    details: {
      id_detalle: !id_detalle ? "Falta id_detalle" : null,
      id_entrenador: id_entrenador === undefined ? "Falta id_entrenador" : null
    }
  });
}


  if (!req.user || !req.user.id) {
    return res.status(401).json({
      error: "No autorizado",
      details: "Usuario no autenticado o token inválido"
    });
  }

  const fecha = new Date().toISOString().slice(0, 10);

  // Validar si ya existe una asistencia para ese cliente hoy
  const checkSql = `
    SELECT id_asistencia FROM asistencias
    WHERE id_detalle = ? AND fecha = ?
  `;

  db.query(checkSql, [id_detalle, fecha], (checkErr, checkResults) => {
    if (checkErr) {
      return res.status(500).json({ error: "Error al verificar asistencias previas", details: checkErr.message });
    }

    if (checkResults.length > 0) {
      return res.status(409).json({
        error: "Asistencia duplicada",
        message: "Este cliente ya registró asistencia hoy"
      });
    }

    // Si no hay asistencia hoy, continuar con la inserción
    const hora_entrada = new Date().toTimeString().slice(0, 8);
    const hora_salida = null;
    const id_usuario = req.user.id;
    const estado = 1;

    // Modificación importante: Permitir NULL cuando id_entrenador es 0
    const finalEntrenadorId = id_entrenador === 0 ? null : id_entrenador;

    const insertSql = `
      INSERT INTO asistencias 
      (fecha, hora_entrada, hora_salida, id_detalle, id_entrenador, id_usuario, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [fecha, hora_entrada, hora_salida, id_detalle, finalEntrenadorId, id_usuario, estado];

    db.query(insertSql, values, (err, result) => {
      if (err) {
        console.error("Error en la base de datos:", err);
        return res.status(500).json({
          error: "Error en la base de datos",
          details: err.message
        });
      }

      res.status(201).json({
        message: "Asistencia creada",
        id: result.insertId,
        data: {
          fecha,
          hora_entrada,
          id_detalle,
          id_entrenador: finalEntrenadorId
        }
      });
    });
  });
};


// Obtener todas las asistencias
exports.getAsistencias = (_req, res) => {
  db.query("SELECT * FROM asistencias", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(200).json(results);
  });
};

//Obtener asistencia por ID (corregido)
exports.getAsistenciaById = (req, res) => {
  const { id_asistencia } = req.params;

  const query = `
    SELECT 
      a.*, 
      c.nombre AS nombre_cliente, 
      p.plan AS nombre_plan,
      CASE 
        WHEN a.id_entrenador IS NULL THEN 'Sin entrenador'
        ELSE CONCAT(e.nombre, ' ', e.apellido)
      END AS nombre_entrenador
    FROM asistencias a
    INNER JOIN detalle_planes dp ON a.id_detalle = dp.id
    INNER JOIN clientes c ON dp.id_cliente = c.id
    INNER JOIN planes p ON dp.id_plan = p.id
    LEFT JOIN entrenador e ON a.id_entrenador = e.id
    WHERE a.id_asistencia = ?
  `;

  db.query(query, [id_asistencia], (err, results) => {
    if (err) {
      console.error("Error en la base de datos:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Asistencia no encontrada" });
    }

    res.status(200).json(results[0]);
  });
};



// Actualizar asistencia
exports.updateAsistencia = (req, res) => {
  const { id_asistencia } = req.params;

  const hora_salida = new Date().toLocaleTimeString('es-PE', { hour12: false });
  const id_usuario = req.user.id;
  const estado = 0;

  const { hora_entrada, id_detalle, id_entrenador } = req.body;

  if (!hora_entrada || !id_detalle || id_entrenador === undefined) {
    return res.status(400).json({ 
      error: "hora_entrada, id_detalle, y id_entrenador son obligatorios (id_entrenador puede ser 0)" 
    });
  }

  const finalEntrenadorId = id_entrenador === 0 ? null : id_entrenador;

  db.query(
    `SELECT id_asistencia FROM asistencias WHERE id_asistencia = ?`,
    [id_asistencia],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      if (results.length === 0) return res.status(404).json({ error: "Asistencia no encontrada" });

      db.query(
        `UPDATE asistencias 
         SET hora_entrada = ?, hora_salida = ?, id_detalle = ?, id_entrenador = ?, id_usuario = ?, estado = ? 
         WHERE id_asistencia = ?`,
        [hora_entrada, hora_salida, id_detalle, finalEntrenadorId, id_usuario, estado, id_asistencia],
        (err, result) => {
          if (err) return res.status(500).json({ error: "Error en la base de datos" });
          if (result.affectedRows === 0) return res.status(404).json({ error: "Asistencia no encontrada" });

          res.status(200).json({ message: "Asistencia actualizada" });
        }
      );
    }
  );
};


// Eliminar asistencia
exports.deleteAsistencia = (req, res) => {
  const { id_asistencia } = req.params;

  db.query("DELETE FROM asistencias WHERE id_asistencia = ?", [id_asistencia], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Asistencia no encontrada" });

    res.status(200).json({ message: "Asistencia eliminada" });
  });
};
