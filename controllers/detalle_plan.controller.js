const db = require("../config/database");

// Crear detalle plan
exports.createDetallePlan = (req, res) => {
  const { id_cliente, id_plan, fecha, hora, fecha_venc, fecha_limite, id_user, estado } = req.body;
  if (!id_cliente || !id_plan || !fecha || !hora || !fecha_venc || !fecha_limite || !id_user || !estado) return res.status(400).json({ error: "Todos los campos son obligatorios" });

  db.query("INSERT INTO detalle_planes (id_cliente, id_plan, fecha, hora, fecha_venc, fecha_limite, id_user, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [id_cliente, id_plan, fecha, hora, fecha_venc, fecha_limite, id_user, estado], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(201).json({ message: "Detalle plan creada", id: result.insertId });
  });
};

// Obtener todas las detalle planes
exports.getDetallePlanes = (_req, res) => {
  db.query("SELECT * FROM detalle_planes", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(200).json(results);
  });
};

// Obtener detalle plan por ID
exports.getDetallePlanById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM detalle_planes WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (results.length === 0) return res.status(404).json({ error: "Detalle Plan no encontrada" });

    res.status(200).json(results[0]);
  });
};

// Actualizar detalle plan por ID
exports.updateDetallePlan = (req, res) => {
  const { id } = req.params;
  const { id_cliente, id_plan, fecha, hora, fecha_venc, fecha_limite, id_user, estado } = req.body;
  if (!id_cliente || !id_plan || !fecha || !hora || !fecha_venc || !fecha_limite || !id_user || !estado) return res.status(400).json({ error: "Todos los campos son obligatorios" });

  db.query("UPDATE detalle_planes SET id_cliente = ?, id_plan = ?, fecha = ?, hora = ?, fecha_venc = ?, fecha_limite = ?, id_user = ?, estado = ? WHERE id = ?", [id_cliente, id_plan, fecha, hora, fecha_venc, fecha_limite, id_user, estado, id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Deralle plan no encontrada" });

    res.status(200).json({ message: "Detalle plan actualizada" });
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
