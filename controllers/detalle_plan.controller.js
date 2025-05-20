const db = require("../config/database");

// Crear detalle plan
exports.createDetallePlan = (req, res) => {
  const { id_cliente, id_plan, fecha_venc, fecha_limite } = req.body;

  if (!id_cliente || !id_plan || !fecha_venc || !fecha_limite) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Obtener fecha y hora actuales en zona horaria local
  const ahora = new Date();
  const fecha = ahora.toISOString().slice(0, 10);           // Fecha: YYYY-MM-DD (UTC, usualmente aceptable)
  const hora = ahora.toTimeString().slice(0, 8);            // Hora local: HH:mm:ss

  // Verifica que haya usuario autenticado
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  const id_user = req.user.id;
  const estado = 1; // Activo

  const sql = `
    INSERT INTO detalle_planes 
    (id_cliente, id_plan, fecha, hora, fecha_venc, fecha_limite, id_user, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [id_cliente, id_plan, fecha, hora, fecha_venc, fecha_limite, id_user, estado];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error en la base de datos:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }

    res.status(201).json({ message: "Detalle plan creado", id: result.insertId });
  });
};

// Obtener todas las detalle planes
exports.getDetallePlanes = (_req, res) => {
  db.query("SELECT * FROM detalle_planes", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(200).json(results);
  });
};

// Obtener detalle_plan por ID, incluyendo nombre del cliente, nombre del plan y precio del plan
exports.getDetallePlanById = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      dp.id, 
      c.nombre AS cliente, 
      p.plan AS plan, 
      p.precio_plan,           -- ✅ Incluido aquí
      dp.fecha_inicio, 
      dp.fecha_fin
    FROM detalle_planes dp
    INNER JOIN clientes c ON dp.id_cliente = c.id
    INNER JOIN planes p ON dp.id_plan = p.id
    WHERE dp.id = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (results.length === 0) return res.status(404).json({ error: "Detalle Plan no encontrado" });

    res.status(200).json(results[0]);
  });
};

// Actualizar detalle plan por ID
exports.updateDetallePlan = (req, res) => {
  const { id } = req.params;
  const { id_cliente, id_plan, fecha_venc, fecha_limite, estado } = req.body;

  // Verifica campos obligatorios
  if (!id_cliente || !id_plan || !fecha_venc || !fecha_limite || !estado) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Validar que el usuario esté autenticado
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  // Obtener fecha y hora actual
  const ahora = new Date();
  const fecha = ahora.toISOString().slice(0, 10); // YYYY-MM-DD
  const hora = ahora.toTimeString().slice(0, 8);  // HH:mm:ss
  const id_user = req.user.id;

  const sql = `
    UPDATE detalle_planes 
    SET id_cliente = ?, id_plan = ?, fecha = ?, hora = ?, fecha_venc = ?, fecha_limite = ?, id_user = ?, estado = ?
    WHERE id = ?`;

  const values = [id_cliente, id_plan, fecha, hora, fecha_venc, fecha_limite, id_user, estado, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error en base de datos:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Detalle plan no encontrado" });
    }

    res.status(200).json({ message: "Detalle plan actualizado correctamente" });
  });
};


// Eliminar detalle plan por ID
exports.deleteDetallePlan = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM detalle_planes WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Detalle plan no encontrada" });

    res.status(200).json({ message: "Detalle plan eliminada" });
  });
};
