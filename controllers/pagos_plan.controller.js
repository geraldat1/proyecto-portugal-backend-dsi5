const db = require("../config/database");

// Crear pagos plan
exports.createPagosPlan = (req, res) => {
  const { id_detalle, id_cliente, id_plan, precio, fecha, hora, id_user, estado } = req.body;
  if (!id_detalle || !id_cliente || !id_plan || !precio || !fecha || !hora || !id_user || !estado) return res.status(400).json({ error: "Todos los campos son obligatorios" });

  db.query("INSERT INTO pagos_planes (id_detalle, id_cliente, id_plan, precio, fecha, hora, id_user, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [id_detalle, id_cliente, id_plan, precio, fecha, hora, id_user, estado], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(201).json({ message: "Pagos planes creada", id: result.insertId });
  });
};

// Obtener todas las pagos planes
exports.getPagosPlanes = (_req, res) => {
  db.query("SELECT * FROM pagos_planes", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(200).json(results);
  });
};

// Obtener pagos plan por ID
exports.getPagosPlanById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM pagos_planes WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (results.length === 0) return res.status(404).json({ error: "Pagos planes no encontrada" });

    res.status(200).json(results[0]);
  });
};

// Actualizar pagos plan por ID
exports.updatePagosPlan = (req, res) => {
  const { id } = req.params;
  const { id_detalle, id_cliente, id_plan, precio, fecha, hora, id_user, estado } = req.body;
  if (!id_detalle || !id_cliente || !id_plan || !precio || !fecha || !hora || !id_user || !estado) return res.status(400).json({ error: "Todos los campos son obligatorios" });

  db.query("UPDATE pagos_planes SET id_detalle = ?, id_cliente = ?, id_plan = ?, precio = ?, fecha = ?, hora = ?, id_user = ?, estado = ? WHERE id = ?", [id_detalle, id_cliente, id_plan, precio, fecha, hora, id_user, estado, id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Pagos planes no encontrada" });

    res.status(200).json({ message: "Pagos planes actualizada" });
  });
};

// Eliminar pagos plan por ID
exports.deletePagosPlan = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM pagos_planes WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Pagos planes no encontrada" });

    res.status(200).json({ message: "Pagos planes eliminada" });
  });
};
