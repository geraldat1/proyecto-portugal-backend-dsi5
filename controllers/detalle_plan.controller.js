const db = require("../config/database");

// Crear detalle plan
exports.createDetallePlan = (req, res) => {
  const { id_cliente, id_plan, fecha_venc, fecha_limite } = req.body;

  if (!id_cliente || !id_plan || !fecha_venc || !fecha_limite) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Fecha y hora locales (con objeto Date directo)
  const fecha = new Date(); // ✅ Evita problemas con zona horaria

  // Verifica usuario autenticado
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  const id_user = req.user.id;
  const estado = 1; // Activo

  const sql = `
    INSERT INTO detalle_planes 
    (id_cliente, id_plan, fecha, hora, fecha_venc, fecha_limite, id_user, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const hora = fecha.toTimeString().slice(0, 8); // HH:mm:ss

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

// Obtener detalle_plan por ID (con datos del cliente y plan)
exports.getDetallePlanById = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      dp.id, 
      c.nombre AS cliente, 
      p.plan AS plan, 
      p.precio_plan, 
      dp.fecha AS fecha_inicio, 
      dp.fecha_venc AS fecha_fin
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

  if (!id_cliente || !id_plan || !fecha_venc || !fecha_limite || estado === undefined) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  const fecha = new Date(); // ✅ Fecha actual como objeto Date
  const hora = fecha.toTimeString().slice(0, 8); // HH:mm:ss
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

  const sql = `
    UPDATE detalle_planes
    SET estado = 0
    WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Detalle plan no encontrada" });

    res.status(200).json({ message: "Detalle plan deshabilitada (estado cambiado a 0)" });
  });
};

